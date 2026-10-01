# Dokumentasi Project

Dokumentasi ini menjadi sumber kebenaran untuk produk dan engineering. Status saat ini: fondasi repository; produk belum ditentukan dan belum ada aplikasi yang diimplementasikan. Preferensi teknologi sudah tersedia, tetapi stack aplikasi belum dipilih.

## Sumber kebenaran

| Informasi | Dokumen | Status |
| --- | --- | --- |
| Masalah, pengguna, tujuan, scope, hasil produk | [PRD](product/PRD.md) | Draft; keputusan produk TBD |
| Perilaku software dan acceptance criteria | [SRS](requirements/SRS.md) | Draft; belum ada requirement produk yang disetujui |
| Boundary dan tanggung jawab sistem | [Architecture overview](architecture/overview.md) | Kondisi repository tercatat; arsitektur produk TBD |
| Preferensi teknologi | [Stack JavaScript/TypeScript](javascript-typescript-stack.md) | Termasuk backend Rust/Tauri untuk desktop besar; bukan stack aplikasi final |
| Alasan keputusan teknis | [Indeks ADR](architecture/decisions/README.md) | Belum ada ADR aplikasi |
| Struktur kode dan aturan engineering | [Conventions](engineering/conventions.md) | Baseline untuk implementasi pertama |
| Pendekatan verifikasi | [Testing strategy](engineering/testing-strategy.md) | Strategi tersedia; tooling dan CI TBD |

Alur: tujuan PRD → requirement SRS → boundary arsitektur dan ADR → implementasi → tes → operasi. Keputusan teknologi tidak ditempatkan di PRD atau dijadikan requirement perilaku di SRS.

## Dokumen yang dibuat saat dibutuhkan

| Dokumen | Buat ketika | Sumber implementasi yang harus dirujuk |
| --- | --- | --- |
| `requirements/glossary.md` | Ada istilah domain yang perlu definisi bersama | PRD dan SRS |
| `architecture/api-contract.md` | Ada interface yang akan digunakan komponen lain | Spec machine-readable atau tipe/schema kontrak; pilih saat arsitektur ditetapkan |
| `architecture/erd.md` | Ada entitas domain persisten dan relasinya | Migrations untuk detail schema yang tepat |
| `engineering/security.md` | Boundary data, autentikasi, otorisasi, atau integrasi sensitif sudah ditentukan | Requirement security di SRS; aturan awal ada di conventions |
| `operations/deployment.md` | Target deployment dan proses rilis ditentukan | Konfigurasi build/IaC dan prosedur migration/rollback aktual |
| `operations/runbook.md` | Ada layanan yang dioperasikan dan prosedur diagnosis/pemulihan | Health checks, logs, metrics, dan recovery yang benar-benar tersedia |

Tidak ada endpoint, entity, environment staging/production, queue, atau recovery procedure yang diasumsikan dari contoh dokumentasi. Informasi belum diketahui ditulis sebagai **TBD** atau **Open Question** di dokumen pemiliknya.

## ID dan traceability

- Tujuan produk: `PG-001`, `PG-002`, dan seterusnya, dimiliki PRD.
- Requirement: `FR-<DOMAIN>-001` atau `NFR-<AREA>-001`; kategori `SEC`, `PERF`, `REL`, dan `OBS` boleh digunakan untuk kebutuhan spesifik.
- Keputusan: `ADR-001`, `ADR-002`, dan seterusnya, sesuai [aturan ADR](architecture/decisions/README.md).
- ID tetap stabil saat judul atau detail berubah. ID yang dihentikan tidak dipakai ulang.
- Task implementasi di `.orchestration/tasks/` merujuk ID requirement, acceptance criteria, dan dokumen relevan. Task maintenance seperti setup dokumentasi boleh mencatat bahwa requirement produk belum berlaku.
- SRS menghubungkan requirement ke tujuan PRD dan bukti implementasi/tes ketika tersedia; jangan membuat matriks duplikat di dokumen lain.

## Memuat konteks untuk manusia dan agent

Gunakan [AGENTS.md](../AGENTS.md) dan role di `.agents/` untuk cara kerja agent. Setelah itu, pilih konteks sesuai pekerjaan:

| Pekerjaan | Konteks dokumentasi |
| --- | --- |
| Product/planning | PRD, SRS, glossary ketika tersedia |
| Architecture | SRS, overview, ADR relevan, preferensi stack |
| Backend/data | Requirement terkait, kontrak API/ERD ketika tersedia, ADR, conventions, source/migrations terkait |
| Frontend | Requirement terkait, kontrak API dan UI spec ketika tersedia, conventions, source terkait |
| Testing/review | Task, ID requirement, acceptance criteria, constraint/ADR relevan, diff, hasil verifikasi |

Progress, assignment, dan run records disimpan hanya di `.orchestration/`. Dokumentasi ini menyimpan fakta dan keputusan yang bertahan setelah sebuah task selesai.

## Kebijakan pembaruan

Perubahan harus memperbarui sumber kebenarannya bersama implementasi: perilaku → SRS dan tes; interface → kontrak dan tes; boundary → overview dan ADR jika trade-off penting; relasi data → migration dan ERD; rilis/recovery → dokumentasi operasi.

Jika dua dokumen bertentangan, catat konflik, gunakan dokumen pemilik untuk menyelesaikan keputusan, lalu koreksi dokumen yang terdampak. Jangan memilih salah satu secara diam-diam. Review perubahan harus memastikan link tetap valid dan dokumentasi menggambarkan kondisi aktual.

## Langkah berikutnya

Isi [open questions PRD](product/PRD.md#open-questions) tentang masalah pengguna dan scope MVP. Turunkan tujuan yang disepakati menjadi requirement dengan acceptance criteria di SRS sebelum menetapkan arsitektur aplikasi.
