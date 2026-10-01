# Engineering Conventions

Status: Baseline untuk implementasi pertama. Struktur source, formatter, lint, dan nama script belum dipilih. Konvensi ini mengatur kode project; cara agent bekerja ada di [AGENTS.md](../../AGENTS.md).

## Repository dan Module Boundaries

Ikuti boundary [architecture overview](../architecture/overview.md) dan simpan konteks produk/teknis menurut [pemilik dokumentasi](../README.md). Struktur source ditentukan setelah boundary aplikasi diketahui; jangan menetapkan layer atau service tanpa kebutuhan.

Tipe dan schema kontrak yang dibagikan tidak boleh mengimpor secret, koneksi database, atau implementasi server ke frontend. Modul aplikasi harus memiliki tanggung jawab yang jelas; pisahkan dependency lintas boundary melalui kontrak yang disepakati.

## Naming dan Dependencies

Gunakan istilah domain konsisten; buat glossary saat istilah perlu definisi bersama. Pilihan teknologi merujuk [stack guide](../javascript-typescript-stack.md). Jangan menduplikasi daftar stack di sini. Commit lockfile untuk dependency yang digunakan dan dokumentasikan script setelah tooling tersedia.

## Validation dan Error Handling

Validasi input eksternal saat masuk ke boundary sistem. Tipe TypeScript saja tidak membuktikan data runtime valid. Simpan schema yang dibagikan pada boundary kontrak dan tautkan implementasinya dari API contract ketika tersedia.

Bedakan error input/domain yang diperkirakan dari kegagalan internal. Kontrak menentukan bentuk error publik; detail internal dan stack trace tidak dikirim ke pengguna. Pilihan pola effects/error mengikuti kebutuhan dan keputusan teknis project.

## Security dan Logging Awal

- Secret tidak disimpan di source, dokumentasi, log, atau artifact tes. Dokumentasikan nama konfigurasi dan cara menyediakannya ketika integrasi tersedia.
- Jangan log credential, session token, atau payload sensitif. Pilih metadata diagnosis sesuai klasifikasi data yang disepakati.
- Jika fitur akses privat dibuat, authorization harus ditegakkan di boundary server untuk setiap resource; pembatasan UI saja tidak cukup.
- Autentikasi, model akses, audit, retention, dan integrasi sensitif: TBD. Pindahkan detailnya ke `security.md` saat boundary tersebut ditentukan; jangan membuat sumber aturan ganda.

## Code Review

Perubahan perilaku menyertakan ID requirement dan bukti verifikasi sesuai [testing strategy](testing-strategy.md). Review mencakup kontrak lintas boundary, data sensitif, perubahan dependency, dan pembaruan dokumen pemilik. Workflow branch/release khusus: TBD; belum ada aturan CI atau merge yang diklaim aktif.
