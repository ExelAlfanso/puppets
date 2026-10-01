# Stack JavaScript dan TypeScript

Ini stack pilihan untuk project JavaScript dan TypeScript. Pilih framework sesuai ukuran dan kompleksitas project; tidak semua project perlu memakai seluruh komponen di bawah.

## Tool utama

| Area | Pilihan | Catatan |
| --- | --- | --- |
| Runtime | Bun | Runtime untuk menjalankan JavaScript dan TypeScript di sisi server. |
| Package manager | pnpm | Gunakan pnpm untuk memasang dan mengelola dependency project. |
| Backend | ElysiaJS | Untuk membangun API TypeScript, terutama saat memakai Bun. |
| Tipe API frontend/backend | Eden Treaty | Bagikan tipe route Elysia ke frontend agar pemanggilan API tetap type-safe. |
| Validasi | Zod | Definisikan schema di batas input dan bagikan schema atau tipe inferensi antara backend dan frontend bila diperlukan. |
| Autentikasi | Better Auth | Library autentikasi pilihan. |
| Infrastructure as code | Alchemy | Tool IaC pilihan. |
| Effects | Effect TS | Gunakan untuk typed effects dan penanganan error terstruktur saat pola ini membantu; kode sederhana tetap ditulis langsung. |

## Library UI

- React: shadcn/ui.
- Vue: VUX.

## Pilihan database

- SQLite untuk project kecil dan sederhana dengan kebutuhan relasi yang terbatas.
- PostgreSQL untuk project kompleks, banyak entitas yang saling berelasi, atau query relasional yang berat.

## Framework berdasarkan ukuran project

| Ukuran project | React | Vue | Arah build/framework |
| --- | --- | --- | --- |
| Kecil sampai menengah | React + TanStack Router | Vue + Vue Router | Vite |
| Besar | TanStack Start | Nuxt | Pilih full-stack framework yang sesuai dengan ekosistem UI. |

## Panduan pemilihan

Mulai dari setup paling sederhana yang memenuhi kebutuhan produk. Untuk aplikasi client-focused kecil atau menengah, gunakan Vite dan router sesuai framework yang dipilih. Untuk aplikasi besar yang membutuhkan server rendering dan konvensi full-stack, gunakan TanStack Start untuk React atau Nuxt untuk Vue.
