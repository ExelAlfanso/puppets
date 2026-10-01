# Stack JavaScript dan TypeScript

Status: preferensi pengguna untuk project JavaScript/TypeScript, dengan Rust melalui Tauri sebagai backend untuk aplikasi desktop besar; stack aplikasi project ini belum dipilih. Keputusan final yang memiliki trade-off penting dicatat di [ADR](architecture/decisions/README.md). Boundary aplikasi dimiliki [architecture overview](architecture/overview.md).

Ini stack pilihan untuk project JavaScript dan TypeScript. Pilih framework sesuai ukuran dan kompleksitas project; tidak semua project perlu memakai seluruh komponen di bawah.

## Backend Rust melalui Tauri

Untuk project desktop besar, gunakan Tauri dengan Rust sebagai backend aplikasi. Frontend tetap menggunakan JavaScript/TypeScript dengan React atau Vue. Scope ini mencakup logika backend dan akses kemampuan native melalui Tauri; pilihan frontend mengikuti kebutuhan aplikasi desktop.

Kontrak komunikasi frontend dengan backend Tauri: TBD saat arsitektur ditetapkan. ElysiaJS dan Eden Treaty berlaku saat project memiliki API server TypeScript. Bun dan pnpm digunakan untuk bagian JavaScript/TypeScript; konfigurasi build backend Rust/Tauri ditetapkan saat implementasi.

## Tool utama

| Area | Pilihan | Catatan |
| --- | --- | --- |
| Runtime | Bun | Runtime untuk menjalankan JavaScript dan TypeScript di sisi server. |
| Package manager | pnpm | Gunakan pnpm untuk memasang dan mengelola dependency project. |
| Backend API server | ElysiaJS | Untuk membangun API TypeScript, terutama saat memakai Bun. |
| Backend desktop besar | Rust + Tauri | Backend aplikasi desktop dengan frontend JavaScript/TypeScript. |
| Tipe API frontend/backend | Eden Treaty | Bagikan tipe route Elysia ke frontend agar pemanggilan API tetap type-safe. |
| Validasi | Zod | Definisikan schema di batas input dan bagikan schema atau tipe inferensi antara backend dan frontend bila diperlukan. |
| Autentikasi | Better Auth | Library autentikasi pilihan. |
| Infrastructure as code | Alchemy | Tool IaC pilihan. |
| Effects | Effect TS | Gunakan untuk typed effects dan penanganan error terstruktur saat pola ini membantu; kode sederhana tetap ditulis langsung. |
| Pengiriman event/job ke workers | BullMQ | Antrean pekerjaan untuk mengantarkan event sebagai job ke workers. |
| Penyimpanan antrean | Redis | Dependency BullMQ untuk menyimpan antrean dan state job. |

## Event dan background workers

Gunakan BullMQ untuk pengiriman event/job asynchronous ke workers saat project membutuhkan pemrosesan background. Producer memasukkan event sebagai job ke antrean BullMQ yang disimpan di Redis; worker mengambil job dan memprosesnya. Model antrean ini mengikuti [dokumentasi BullMQ](https://docs.bullmq.io/guide/queues/).

Alur: producer → antrean BullMQ/Redis → worker.

Schema payload, nama antrean, retry/backoff, idempotency, concurrency, serta penanganan job gagal: TBD sesuai kebutuhan produk. Jika producer berada di backend Rust/Tauri, boundary integrasinya dengan antrean BullMQ perlu ditetapkan saat arsitektur dipilih. Catat kontrak event dalam API contract dan keputusan integrasi yang memiliki trade-off penting dalam ADR.

## Library UI

- React: shadcn/ui.
- Vue: VUX.

Open Question: identitas package dan versi VUX yang dimaksud perlu dipastikan sebelum implementasi Vue. Preferensi ini dipertahankan sesuai instruksi pengguna.

## Pilihan database

- SQLite untuk project kecil dan sederhana dengan kebutuhan relasi yang terbatas.
- PostgreSQL untuk project kompleks, banyak entitas yang saling berelasi, atau query relasional yang berat.

## Framework berdasarkan ukuran project

| Ukuran project | React | Vue | Arah build/framework |
| --- | --- | --- | --- |
| Kecil sampai menengah | React + TanStack Router | Vue + Vue Router | Vite |
| Web besar | TanStack Start | Nuxt | Pilih full-stack framework yang sesuai dengan ekosistem UI. |
| Desktop besar | React | Vue | Frontend JavaScript/TypeScript + backend Rust melalui Tauri; integrasi build/router TBD. |

## Panduan pemilihan

Mulai dari setup paling sederhana yang memenuhi kebutuhan produk. Untuk aplikasi client-focused kecil atau menengah, gunakan Vite dan router sesuai framework yang dipilih. Untuk aplikasi besar yang membutuhkan server rendering dan konvensi full-stack, gunakan TanStack Start untuk React atau Nuxt untuk Vue.
