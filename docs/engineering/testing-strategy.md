# Testing Strategy

Status: Strategi awal; repository belum memiliki aplikasi, test runner, build scripts, atau CI checks. Tidak ada command tes atau hasil produk yang diklaim tersedia.

## Testing Goals

Verifikasi [acceptance criteria SRS](../requirements/SRS.md) secara deterministik dan sesuai risiko. Fokus pada perilaku observable, jalur error, serta boundary data/akses. Hindari tes yang hanya menyalin detail implementasi.

## Pemilihan Jenis Tes

| Jenis | Gunakan untuk |
| --- | --- |
| Unit | Logika domain murni dan kasus boundary yang tidak membutuhkan layanan nyata |
| Integration | Perilaku antar modul serta interaksi database/auth saat komponen itu tersedia |
| Contract | Kesesuaian schema, request/response, dan error lintas client/server; typing API saja tidak menggantikan validasi runtime |
| End-to-end | Flow utama pengguna dan kegagalan penting yang disepakati di PRD/SRS |
| Performance | Target terukur di requirement performance; jangan menetapkan budget atau load profile tanpa kebutuhan |

Tidak semua perubahan membutuhkan semua jenis tes. Pilih verifikasi yang memberi bukti terhadap requirement yang terdampak.

## Traceability

SRS menyimpan link requirement → task/kode/tes ketika tersedia. Nama atau deskripsi tes dapat menyertakan ID requirement agar bukti mudah ditelusuri. Saat requirement berubah, perbarui acceptance criteria dan tes terkait bersama implementasi.

## Test Environment

Tooling dan konfigurasi: TBD setelah framework dipilih. Tes harus memiliki data terisolasi, mengendalikan waktu/randomness jika berpengaruh, dan membersihkan state. Gunakan fixture yang tidak berisi data atau secret production.

## Required CI Checks

Belum ada CI yang dikonfigurasi. Pada implementasi pertama, tetapkan command yang benar-benar tersedia untuk lint/format, typecheck, build, dan tes relevan, lalu catat command dan syarat lulus di sini. Jangan menyebut checks sebagai wajib/aktif sebelum workflow-nya tersedia.

## Verifikasi Dokumentasi

Untuk perubahan dokumentasi, cek link lokal, konsistensi sumber kebenaran, ID, dan kesesuaian klaim dengan repository. Runtime tests tidak diperlukan untuk perubahan dokumentasi saja. Evidence sementara disimpan di `.orchestration/`, bukan ditambahkan sebagai fakta produk permanen.
