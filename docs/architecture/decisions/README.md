# Architecture Decision Records

ADR menjelaskan alasan pilihan teknis yang memiliki trade-off penting, memengaruhi beberapa boundary, sulit dibalik, atau perlu dipahami pengembang berikutnya. Preferensi pengguna di [stack guide](../../javascript-typescript-stack.md) tetap berlaku sebagai masukan; belum ada pilihan stack aplikasi yang diubah menjadi ADR Accepted.

## Register

Belum ada ADR aplikasi. Tidak ada file contoh yang diperlakukan sebagai keputusan aktual.

## Aturan pencatatan

- Gunakan nomor berurutan `ADR-001-judul.md`; ID tidak dipakai ulang.
- Status: Proposed, Accepted, Rejected, atau Superseded.
- Tulis Context, Decision, Alternatives Considered, dan Consequences. Sertakan link requirement atau boundary yang melatarbelakanginya.
- Jelaskan alasan alternatif ditolak dan biaya/risiko pilihan, bukan hanya nama library.
- Keputusan baru yang menggantikan keputusan Accepted membuat ADR baru. Tandai ADR lama Superseded dan tautkan keduanya; pertahankan alasan historisnya.
- Tambahkan link ADR di register ini dan overview ketika keputusan mengubah boundary sistem.

## Format

```md
# ADR-XXX — Judul Keputusan

Status: Proposed

## Context
Masalah, requirement, constraint, dan kondisi yang membutuhkan keputusan.

## Decision
Pilihan yang diajukan atau disepakati dan scope berlakunya.

## Alternatives Considered
Alternatif nyata beserta kelebihan, keterbatasan, dan alasan pemilihannya.

## Consequences
Manfaat, biaya, risiko, serta perubahan yang diperlukan.
```
