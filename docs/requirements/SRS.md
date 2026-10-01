# Software Requirements Specification

Status: Draft — belum ada requirement produk yang disetujui. SRS menerjemahkan [tujuan PRD](../product/PRD.md) menjadi perilaku software yang dapat diverifikasi.

## Functional Requirements

TBD: perilaku software berdasarkan tujuan produk yang disepakati. Tidak ada requirement autentikasi, task execution, atau fitur lain yang diasumsikan dari skill atau role agent.

## Non-Functional Requirements

TBD: target kualitas yang terukur sesuai risiko produk, termasuk security, performance, reliability, dan observability ketika relevan. Angka latency, kapasitas, availability, dan retention belum ditetapkan.

## Constraints

TBD: batas operasional atau kompatibilitas yang wajib dipenuhi. [Preferensi stack](../javascript-typescript-stack.md) adalah masukan keputusan teknis, bukan requirement perilaku software.

## Format requirement dan traceability

Gunakan [aturan ID](../README.md#id-dan-traceability). Setiap requirement berisi:

| Field | Isi |
| --- | --- |
| ID dan judul | ID stabil dan perilaku singkat |
| Status | Draft, Accepted, atau Retired |
| Dasar | Link ke tujuan `PG-*` atau constraint yang disetujui |
| Perilaku | Apa yang harus dilakukan software, termasuk kondisi pemicu dan hasil |
| Acceptance criteria | Hasil observable untuk jalur sukses, error, dan boundary yang relevan |
| Verifikasi | Jenis tes dan kriteria lulus; link file/hasil ketika tersedia |
| Implementasi | Link task, kode, dan kontrak relevan ketika tersedia; TBD selama belum diimplementasikan |

Requirement non-fungsional harus menyebut ukuran, target, kondisi pengukuran, dan cara verifikasi. Istilah domain yang ambigu harus didefinisikan dalam glossary ketika diperlukan.

## Open Questions

Perilaku dan prioritas menunggu jawaban [PRD](../product/PRD.md#open-questions). Target kualitas dan batas akses/data ditentukan setelah flow utama diketahui. Pendekatan verifikasi ada di [testing strategy](../engineering/testing-strategy.md).
