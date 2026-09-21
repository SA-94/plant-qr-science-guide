import QRCode from 'qrcode'

/**
 * Draws a botanical QR code: organic connected modules, rounded finder eyes and
 * the plant photo inset in the centre behind an accent ring.
 *
 * Several things here are load-bearing for scannability, not styling choices:
 *
 * 1. Modules are drawn as squares that stay fused to their dark neighbours and
 *    round off only on free corners. Detached shapes (plain dots) break the
 *    solid runs that decoders measure and fail to scan even at full size.
 * 2. The cell size is floored to a whole pixel and the canvas sized from it, so
 *    module edges land on pixel boundaries instead of being anti-aliased.
 * 3. Callers must pass a SHORT url (see plantUrl in App.tsx). Longer urls push
 *    the symbol to version 7+, which places an alignment pattern dead centre -
 *    exactly where the photo goes. Alignment patterns are not error-corrected,
 *    so covering one breaks the decode. Version 6 and below keep the centre
 *    free.
 *
 * Error correction is fixed at level H (~30% recoverable), which covers the
 * data modules hidden behind the centre photo.
 */

const QUIET = 4
const FINDER = 7
const MODULE_RADIUS = 0.45
const EYE_RADIUS = 2.1
const PHOTO_FRACTION = 0.1

type PlantQrOptions = {
  url: string
  photo: HTMLImageElement | null
  /** Finder-eye and ring colour — the plant's accent. */
  accent: string
  /** Target canvas edge length in pixels; rounded down to a whole cell size.
   *  840 is ~430 DPI on a 5cm printed sticker and decoded cleanly in testing. */
  size?: number
  /** Centre photo radius as a fraction of the symbol edge. */
  photoFraction?: number
}

/** Cover-fit the photo into a centred circle. */
const drawCentrePhoto = (
  ctx: CanvasRenderingContext2D,
  photo: HTMLImageElement,
  cx: number,
  cy: number,
  radius: number,
) => {
  const side = Math.min(photo.naturalWidth, photo.naturalHeight)
  const sx = (photo.naturalWidth - side) / 2
  const sy = (photo.naturalHeight - side) / 2

  ctx.save()
  ctx.beginPath()
  ctx.arc(cx, cy, radius, 0, Math.PI * 2)
  ctx.clip()
  ctx.drawImage(photo, sx, sy, side, side, cx - radius, cy - radius, radius * 2, radius * 2)
  ctx.restore()
}

export const drawPlantQr = (canvas: HTMLCanvasElement, options: PlantQrOptions) => {
  const { url, photo, accent, size: target = 840, photoFraction = PHOTO_FRACTION } = options

  const qr = QRCode.create(url, { errorCorrectionLevel: 'H' })
  const count = qr.modules.size
  const data = qr.modules.data

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const span = count + QUIET * 2
  const cell = Math.floor(target / span)
  const size = cell * span
  const offset = cell * QUIET

  canvas.width = size
  canvas.height = size

  const dark = (row: number, col: number) =>
    row >= 0 && col >= 0 && row < count && col < count && !!data[row * count + col]

  const inFinder = (row: number, col: number) =>
    (row < FINDER && col < FINDER) ||
    (row < FINDER && col >= count - FINDER) ||
    (row >= count - FINDER && col < FINDER)

  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, size, size)

  const cx = size / 2
  const cy = size / 2
  const photoRadius = size * photoFraction
  const clearRadius = photoRadius + cell * 1.2

  const gradient = ctx.createLinearGradient(0, 0, size, size)
  gradient.addColorStop(0, '#0d4f3c')
  gradient.addColorStop(1, '#1b6f4e')
  ctx.fillStyle = gradient

  const r = cell * MODULE_RADIUS
  for (let row = 0; row < count; row += 1) {
    for (let col = 0; col < count; col += 1) {
      if (!dark(row, col) || inFinder(row, col)) continue

      const x = offset + col * cell
      const y = offset + row * cell
      if (photo && Math.hypot(x + cell / 2 - cx, y + cell / 2 - cy) < clearRadius) continue

      const up = dark(row - 1, col)
      const down = dark(row + 1, col)
      const left = dark(row, col - 1)
      const right = dark(row, col + 1)

      ctx.beginPath()
      ctx.roundRect(x, y, cell, cell, [
        !up && !left ? r : 0,
        !up && !right ? r : 0,
        !down && !right ? r : 0,
        !down && !left ? r : 0,
      ])
      ctx.fill()
    }
  }

  // Finder eyes: rounded ring in brand green with an accent-coloured pupil.
  const drawEye = (row: number, col: number) => {
    const x = offset + col * cell
    const y = offset + row * cell
    const outer = FINDER * cell

    ctx.fillStyle = '#0d4f3c'
    ctx.beginPath()
    ctx.roundRect(x, y, outer, outer, cell * EYE_RADIUS)
    ctx.roundRect(x + cell, y + cell, outer - cell * 2, outer - cell * 2, cell * (EYE_RADIUS * 0.7))
    ctx.fill('evenodd')

    // Pupils stay dark on purpose. A light accent here inverts the contrast the
    // finder pattern depends on and the symbol stops scanning outright.
    ctx.beginPath()
    ctx.roundRect(x + cell * 2, y + cell * 2, cell * 3, cell * 3, cell * 1.1)
    ctx.fill()
  }

  drawEye(0, 0)
  drawEye(0, count - FINDER)
  drawEye(count - FINDER, 0)

  if (photo?.complete && photo.naturalWidth > 0) {
    ctx.fillStyle = '#ffffff'
    ctx.beginPath()
    ctx.arc(cx, cy, photoRadius + cell * 0.9, 0, Math.PI * 2)
    ctx.fill()

    drawCentrePhoto(ctx, photo, cx, cy, photoRadius)

    ctx.strokeStyle = accent
    ctx.lineWidth = cell * 0.7
    ctx.beginPath()
    ctx.arc(cx, cy, photoRadius + cell * 0.35, 0, Math.PI * 2)
    ctx.stroke()
  }
}

export const loadImage = (src: string) =>
  new Promise<HTMLImageElement | null>((resolve) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => resolve(null)
    img.src = src
  })
