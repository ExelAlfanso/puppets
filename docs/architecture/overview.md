# Architecture Overview

Status: Baseline repository — arsitektur aplikasi TBD. Dokumen ini mencatat boundary yang benar-benar ada dan menjadi tempat mencatat boundary produk setelah [SRS](../requirements/SRS.md) disepakati.

## System Context

Repository dipakai manusia dan AI coding agents untuk mempersiapkan pekerjaan software. Belum ada client aplikasi, API service, database, atau workload runtime yang diimplementasikan.

## Major Components dan Responsibilities

| Boundary repository | Tanggung jawab |
| --- | --- |
| `AGENTS.md` dan `.agents/*.md` | Aturan bersama dan role agent; bukan komponen runtime produk |
| `docs/` | Intent, requirement, arsitektur, keputusan, dan panduan engineering yang bertahan |
| `.orchestration/` | Task, dependensi, progress, dan run records sementara |
| `skills/` | Referensi skill yang dikelompokkan; bukan dependency runtime aplikasi |

Boundary, service ownership, dan komunikasi aplikasi: TBD. Jangan menurunkan arsitektur produk dari daftar role agent.

## Data Flow

Flow data aplikasi: TBD. Alur dokumentasi dan implementasi dijelaskan di [indeks dokumentasi](../README.md).

## External Dependencies

Dependensi aplikasi belum dipasang atau ditetapkan. Gunakan [preferensi stack](../javascript-typescript-stack.md) sebagai masukan; catat pilihan dengan trade-off penting melalui [ADR](decisions/README.md).

## Trust Boundaries

Boundary client/server, identitas, izin akses, klasifikasi data, dan integrasi eksternal: TBD setelah scope produk diketahui. Aturan awal engineering ada di [conventions](../engineering/conventions.md).

## Deployment Model

TBD: target hosting, proses aplikasi, dan environment. Belum ada staging, production, atau deployment pipeline yang didokumentasikan sebagai tersedia.

## Important Constraints

Fondasi repo tetap kecil dan berbasis file sesuai [AGENTS.md](../../AGENTS.md). API contract dan ERD dibuat saat interface serta entitas persisten ditentukan, sesuai [pemicu dokumentasi](../README.md#dokumen-yang-dibuat-saat-dibutuhkan).
