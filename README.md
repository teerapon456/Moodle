# 🎓 คู่มือติดตั้ง LMS (Moodle + MySQL + phpMyAdmin + Next.js)

## 📋 สารบัญ
1. [ความต้องการของระบบ](#ความต้องการของระบบ)
2. [โครงสร้างโปรเจค](#โครงสร้างโปรเจค)
3. [ขั้นตอนการติดตั้ง](#ขั้นตอนการติดตั้ง)
4. [การเข้าใช้งาน](#การเข้าใช้งาน)
5. [การตั้งค่า Moodle Web Services](#การตั้งค่า-moodle-web-services)
6. [คำสั่งที่ใช้บ่อย](#คำสั่งที่ใช้บ่อย)
7. [การแก้ไขปัญหา](#การแก้ไขปัญหา)

---

## 💻 ความต้องการของระบบ

- **Docker Desktop** (Windows/Mac) หรือ **Docker Engine** (Linux)
- **Docker Compose** v2.0+
- **RAM** อย่างน้อย 4GB
- **Disk Space** อย่างน้อย 10GB

---

## 📁 โครงสร้างโปรเจค

```
lms-project/
├── docker-compose.yml          # ไฟล์หลักสำหรับ Docker
├── .env.example                # ตัวอย่างตัวแปร environment
├── .gitignore
│
├── moodle/                     # Moodle Container
│   ├── Dockerfile
│   ├── 000-default.conf        # Apache config
│   ├── docker-entrypoint.sh    # Startup script
│   ├── config.php              # Moodle config (คัดลอกไปที่ html/)
│   └── html/                   # ⬅️ ใส่ไฟล์ Moodle ที่นี่
│       └── .gitkeep
│
└── frontend/                   # Next.js Frontend
    ├── Dockerfile
    ├── package.json
    ├── next.config.js
    ├── tsconfig.json
    ├── tailwind.config.js
    ├── postcss.config.js
    └── src/
        └── app/
            ├── globals.css
            ├── layout.tsx
            └── page.tsx
```

---

## 🚀 ขั้นตอนการติดตั้ง

### ขั้นตอนที่ 1: สร้างโฟลเดอร์โปรเจค

```bash
# สร้างและเข้าโฟลเดอร์
mkdir lms-project
cd lms-project
```

### ขั้นตอนที่ 2: แตกไฟล์ที่ดาวน์โหลด

แตกไฟล์ `lms-docker-complete.zip` ไปยังโฟลเดอร์ `lms-project`

### ขั้นตอนที่ 3: ดาวน์โหลด Moodle Source Code

```bash
# เข้าโฟลเดอร์ moodle
cd moodle

# ดาวน์โหลด Moodle (เลือก version ที่ต้องการ)
# Moodle 4.5 (Latest)
wget https://download.moodle.org/download.php/direct/stable405/moodle-latest-405.tgz

# แตกไฟล์ไปยังโฟลเดอร์ html
tar -xzf moodle-latest-405.tgz
mv moodle/* html/
rm -rf moodle moodle-latest-405.tgz

# กลับไปโฟลเดอร์หลัก
cd ..
```

**สำหรับ Windows (PowerShell):**
```powershell
cd moodle

# ดาวน์โหลดด้วย Browser จาก https://download.moodle.org/
# แล้วแตกไฟล์ไปยังโฟลเดอร์ moodle\html\

cd ..
```

### ขั้นตอนที่ 4: คัดลอก config.php

```bash
# Linux/Mac
cp moodle/config.php moodle/html/

# Windows (PowerShell)
copy moodle\config.php moodle\html\
```

### ขั้นตอนที่ 5: ตั้งค่า Permission (Linux/Mac เท่านั้น)

```bash
chmod +x moodle/docker-entrypoint.sh
chmod -R 755 moodle/html/
```

### ขั้นตอนที่ 6: รัน Docker Compose

```bash
# Build และรันทุก services
docker-compose up -d --build

# ดู logs
docker-compose logs -f
```

### ขั้นตอนที่ 7: รอให้ระบบพร้อม

ดู logs จนเห็นข้อความ:
```
lms-moodle  | ==========================================
lms-moodle  |   Starting Apache Web Server
lms-moodle  | ==========================================
```

### ขั้นตอนที่ 8: ติดตั้ง Moodle

1. เปิด Browser ไปที่ **http://localhost:8080**
2. ทำตามขั้นตอนการติดตั้ง:
   - เลือกภาษา (Thai / English)
   - ยืนยัน paths (ใช้ค่า default)
   - ยืนยัน Database settings (ถูกกรอกจาก config.php)
   - ยอมรับ License Agreement
   - **รอติดตั้ง Database** (5-15 นาที)
   - สร้างบัญชี Admin

---

## 🌐 การเข้าใช้งาน

| บริการ | URL | หมายเหตุ |
|--------|-----|----------|
| **Next.js Frontend** | http://localhost:3000 | Dashboard หลัก |
| **Moodle LMS** | http://localhost:8080 | ระบบ LMS |
| **phpMyAdmin** | http://localhost:8081 | จัดการ Database |

### ข้อมูล Database

| รายการ | ค่า |
|--------|-----|
| Host | `mysql` (ใน Docker) / `localhost` (จากเครื่อง) |
| Port | `3306` |
| Database | `moodle` |
| Username | `moodle` |
| Password | `moodle_password` |
| Root Password | `root_password` |

---

## 🔌 การตั้งค่า Moodle Web Services

เพื่อให้ Next.js Frontend สามารถเรียก API จาก Moodle ได้:

### 1. เปิด Web Services
- ไปที่ **Site administration** > **Advanced features**
- เปิด **Enable web services** ✓

### 2. เปิด REST Protocol
- ไปที่ **Site administration** > **Plugins** > **Web services** > **Manage protocols**
- เปิด **REST protocol** ✓

### 3. สร้าง External Service
- ไปที่ **Site administration** > **Plugins** > **Web services** > **External services**
- คลิก **Add**
- ตั้งชื่อ: `Frontend API`
- เลือก **Enabled** ✓

### 4. สร้าง Token
- ไปที่ **Site administration** > **Plugins** > **Web services** > **Manage tokens**
- คลิก **Create token**
- เลือก User และ Service ที่สร้างไว้
- บันทึก Token ไว้ใช้ใน Frontend

---

## 📝 คำสั่งที่ใช้บ่อย

```bash
# ดูสถานะ containers
docker-compose ps

# ดู logs ทั้งหมด
docker-compose logs -f

# ดู logs เฉพาะ service
docker-compose logs -f moodle
docker-compose logs -f mysql
docker-compose logs -f frontend

# หยุดทุก services
docker-compose down

# หยุดและลบ volumes (ข้อมูลทั้งหมด)
docker-compose down -v

# Rebuild และรันใหม่
docker-compose up -d --build

# เข้าไปใน container
docker exec -it lms-moodle bash
docker exec -it lms-mysql bash
docker exec -it lms-frontend sh

# รัน MySQL command
docker exec -it lms-mysql mysql -u root -proot_password moodle

# ดู disk usage
docker system df
```

---

## 🔧 การแก้ไขปัญหา

### ❌ ปัญหา: แสดง "Index of /" แทนหน้า Moodle

**สาเหตุ:** ไม่มี `config.php` หรือไฟล์ Moodle ไม่ครบ

**แก้ไข:**
```bash
# ตรวจสอบไฟล์
ls -la moodle/html/config.php
ls -la moodle/html/index.php

# ถ้าไม่มี config.php
cp moodle/config.php moodle/html/

# Restart
docker-compose restart moodle
```

### ❌ ปัญหา: Database connection error

**แก้ไข:**
```bash
# ตรวจสอบ MySQL status
docker-compose ps
docker logs lms-mysql

# รอให้ MySQL healthy
docker-compose up -d mysql
sleep 60
docker-compose up -d moodle
```

### ❌ ปัญหา: Permission denied

**แก้ไข (Linux/Mac):**
```bash
sudo chown -R $USER:$USER moodle/html/
sudo chmod -R 755 moodle/html/
docker-compose restart moodle
```

**แก้ไข (Windows):**
- รัน Docker Desktop ในฐานะ Administrator
- หรือแก้ไข permission ผ่าน Properties > Security

### ❌ ปัญหา: หน้าว่างหรือ 500 Error

**แก้ไข:**
```bash
# ดู error log
docker exec -it lms-moodle tail -100 /var/log/apache2/error.log

# เปิด debug mode - แก้ไขใน moodle/html/config.php
# เพิ่มบรรทัด:
# $CFG->debug = (E_ALL | E_STRICT);
# $CFG->debugdisplay = 1;
```

### ❌ ปัญหา: Frontend ไม่แสดงผล

**แก้ไข:**
```bash
# ดู logs
docker logs lms-frontend

# Rebuild frontend
docker-compose up -d --build frontend

# ลอง install dependencies ใหม่
docker exec -it lms-frontend npm install
```

### ❌ ปัญหา: Port ถูกใช้งานอยู่แล้ว

**แก้ไข:**
```bash
# ดูว่า port ไหนถูกใช้
netstat -tulpn | grep -E '3000|8080|8081|3306'

# หยุด process ที่ใช้ port
# หรือแก้ไข docker-compose.yml เปลี่ยน port
```

---

## ⚠️ หมายเหตุสำคัญ

1. **ครั้งแรกที่ติดตั้ง Moodle:** ใช้เวลา 5-15 นาที อย่าปิด Browser
2. **เปลี่ยน Password:** หลังติดตั้ง ควรเปลี่ยน password ใน config files
3. **Backup:** ข้อมูลเก็บใน Docker volumes - ใช้ `docker-compose down` เพื่อหยุดโดยไม่ลบข้อมูล
4. **Production:** ต้องตั้งค่า SSL, firewall, และ security เพิ่มเติม

---

## 📞 ต้องการความช่วยเหลือ?

หากพบปัญหา ให้รัน:
```bash
docker-compose logs > debug-logs.txt
docker-compose ps > container-status.txt
```
แล้วส่งไฟล์มาให้ดู

---

**Happy Learning! 🎉**
