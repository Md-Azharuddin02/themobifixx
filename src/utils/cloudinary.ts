/** Ask Cloudinary for a resized, auto-format image. Non-Cloudinary URLs pass through unchanged. */
export function cldWidth(url: string, width: number): string {
  if (!url.includes('res.cloudinary.com') || !url.includes('/image/upload/')) return url;
  const clean = url.split('?')[0];
  return clean.replace('/image/upload/', `/image/upload/f_auto,q_auto,c_limit,w_${width}/`);
}

/** A still frame (at `second`) from a Cloudinary-hosted video, as a resized JPEG. */
export function cldVideoStill(url: string, width: number, second = 2): string {
  return url.replace('/video/upload/', `/video/upload/so_${second},w_${width},c_limit,q_auto/`).replace(/\.mp4$/, '.jpg');
}
