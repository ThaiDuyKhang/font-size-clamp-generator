# Font-size Clamp Generator (Extended)

Dự án này được phát triển dựa trên dự án gốc [walbo/font-size-clamp](https://github.com/walbo/font-size-clamp) – một công cụ tuyệt vời giúp tạo ra hàm `clamp()` trong CSS để thu phóng font chữ (typography) và khoảng cách (spacing) một cách mượt mà và responsive.

Tuy nhiên, phiên bản mở rộng này mang đến những cập nhật lớn giúp nó trở thành một bộ công cụ toàn diện hơn cho việc thiết kế UI/UX và phát triển Frontend.

---

## 🌐 Trải nghiệm trực tuyến (Live Demo)

Sử dụng ngay phiên bản đã được deploy tại: **[https://clamp.thaiduykhang.com/](https://clamp.thaiduykhang.com/)**

---

## 🌟 Tính năng nổi bật & Các trang công cụ

### 1. Font-Size/Spacing Clamp Generator (Trang chủ)
- **Tạo hàm `clamp()` tự động:** Nhập vào kích thước tối thiểu, tối đa và công cụ sẽ tự động tính toán viewport width và sinh ra mã CSS `clamp()` chính xác.
- **Tính năng mở rộng - Xuất ra Pixel (`px`):** Rất hữu ích khi bạn cần tạo `clamp()` cho các giá trị âm (negative values) như `margin`, `translate`, `top/left/right/bottom`,... giúp bạn giải quyết triệt để vấn đề side-effect của việc quy đổi `rem` kết hợp `vw` với số âm.

### 2. Typography Scale Generator (Trang Typography)
Một trang hoàn toàn mới giúp bạn xây dựng **Hệ thống Design System cho Typography** chuẩn mực, tự động co giãn theo viewport, ứng dụng tỷ lệ scale toán học (Type Scale).
- **Tự động sinh biến CSS (CSS Variables):** Tạo tự động các biến như `--text-xs`, `--text-s`, `--text-m`, `--text-xl`... với khả năng tuỳ biến tiền tố (prefix) linh hoạt.
- **Sử dụng Type Scale (Tỷ lệ vàng):** Hỗ trợ tính toán font size từ base size dựa trên các tỷ lệ chuẩn như *Minor Second (1.067)*, *Major Third (1.250)*, *Perfect Fourth (1.333)*, *Golden Ratio (1.618)*,... cho cả màn hình Mobile (Min) và Desktop (Max).
- **Real-time Preview trực quan:** Xem trước ngay lập tức font chữ sẽ trông như thế nào ở cả kích thước Mobile (Min) và Desktop (Max) cho từng cấp độ biến.
- **Thêm/Sửa/Xoá tuỳ ý:** Dễ dàng tạo thêm các nấc scale mới (ví dụ `3xl`, `4xl`,...) tự động nối tiếp công thức tính toán.
- **Generate CSS nhanh chóng:** Một cú click copy toàn bộ biến CSS `:root` để dán thẳng vào dự án.

---

## ⚖️ So sánh chi tiết: Dự án này vs Bản gốc (walbo/font-size-clamp)

Dưới đây là bảng so sánh giúp người dùng hiểu rõ sự khác biệt và lý do phiên bản này ra đời:

| Tiêu chí | Bản gốc ([walbo/font-size-clamp](https://github.com/walbo/font-size-clamp)) | Phiên bản mở rộng này |
| :--- | :--- | :--- |
| **Mục đích chính** | Tạo hàm CSS `clamp()` đơn lẻ. | Hệ sinh thái công cụ hỗ trợ Layout + Xây dựng Design System Typography. |
| **Đơn vị đầu ra** | Chỉ xuất ra `rem`. | Hỗ trợ xuất ra **cả `rem` và `px`**. Tùy chọn `px` cực kỳ quan trọng cho các layout negative offset. |
| **Hệ thống Typography** | ❌ Không có | ✅ Có riêng trang **Typography Scale Generator** hoàn chỉnh dựa trên Type Scale ratio. |
| **Xử lý giá trị âm** | Lỗi cực trị logic hoặc tác dụng phụ ở một số trình duyệt. | Tuyệt đối an toàn bằng cách cố định biểu thức toán học quy ra `px`. |

---

## 🚀 Hướng dẫn cài đặt & Chạy cục bộ

Dự án này được build bằng [Next.js](https://nextjs.org/).

1. **Clone repository:**
   ```bash
   git clone https://github.com/ThaiDuyKhang/font-size-clamp-generator.git
   cd font-size-clamp
   ```

2. **Cài đặt dependencies:**
   ```bash
   npm install
   # hoặc
   yarn install
   ```

3. **Chạy server development:**
   ```bash
   npm run dev
   # hoặc
   yarn dev
   ```

4. Mở trình duyệt và truy cập [http://localhost:3000](http://localhost:3000) để trải nghiệm.

---

## 🤝 Đóng góp (Contributing)

Nếu bạn có bất kỳ ý tưởng nào để cải thiện công cụ này hoặc fix bug, đừng ngần ngại tạo Issue hoặc Submit một Pull Request.

## 📄 Giấy phép (License)

Dự án này kế thừa một phần tư duy từ bản gốc và được phát triển mở rộng. Xin gửi lời cảm ơn đến tác giả [walbo](https://github.com/walbo) vì ý tưởng gốc tuyệt vời! Vui lòng xem file [LICENSE](./LICENSE) để biết thêm chi tiết về giấy phép MIT.
