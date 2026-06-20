# Cara menaruh gambar & video di source code portfolio

Project ini memakai **Vite + React + TypeScript**. Media project ditampilkan oleh `ProjectSlider` lewat data di `src/lib/data.ts`, pada field `media`.

## Opsi 1 — Direkomendasikan: simpan di `src/assets/projects/`

Cocok untuk gambar/video yang memang bagian dari source code dan ikut diproses bundler Vite.

1. Taruh file di folder:

   ```txt
   src/assets/projects/
   ```

   Contoh:

   ```txt
   src/assets/projects/aria-cover.jpg
   src/assets/projects/ryn-demo.mp4
   src/assets/projects/ryn-poster.jpg
   ```

2. Import file di bagian atas `src/lib/data.ts`:

   ```ts
   import ariaCover from "../assets/projects/aria-cover.jpg";
   import rynDemo from "../assets/projects/ryn-demo.mp4";
   import rynPoster from "../assets/projects/ryn-poster.jpg";
   ```

3. Pakai di data project:

   ```ts
   media: { kind: "image", src: ariaCover },
   ```

   Untuk video:

   ```ts
   media: { kind: "video", src: rynDemo, poster: rynPoster },
   ```

## Opsi 2 — Simpan di `public/media/`

Cocok untuk file yang ingin dipanggil dengan path langsung tanpa import.

1. Taruh file di:

   ```txt
   public/media/
   ```

2. Isi `src/lib/data.ts` seperti ini:

   ```ts
   media: { kind: "image", src: "/media/aria-cover.jpg" },
   ```

   Untuk video:

   ```ts
   media: {
     kind: "video",
     src: "/media/ryn-demo.mp4",
     poster: "/media/ryn-poster.jpg",
   },
   ```

## Format yang aman

- Gambar: `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`
- Video: `.mp4` atau `.webm`
- Untuk video, kompres dulu agar website tidak berat. Usahakan demo pendek dan file kecil.

## Catatan penting untuk repository ini

`ProjectSlider.tsx` sudah mendukung:

```ts
media: { kind: "image", src: "..." }
media: { kind: "video", src: "...", poster: "..." }
media: { kind: "none" }
```

Jadi yang perlu diubah biasanya hanya `src/lib/data.ts` dan file media di folder asset/public.
