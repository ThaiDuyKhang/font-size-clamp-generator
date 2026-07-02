# Font-size Clamp Generator (Extended)

Dự án này được phát triển dựa trên dự án gốc [walbo/font-size-clamp](https://github.com/walbo/font-size-clamp) – một công cụ tuyệt vời giúp tạo ra hàm `clamp()` trong CSS để thu phóng font chữ (typography) và khoảng cách (spacing) một cách mượt mà và responsive.

Tuy nhiên, phiên bản này được mở rộng với một tính năng quan trọng: **Hỗ trợ tùy chọn chuyển đổi sang đơn vị `px` (thay vì chỉ dùng `rem`) để xử lý an toàn và chính xác các giá trị âm trong một số trường hợp sử dụng đặc thù.**

---

## 🌐 Trải nghiệm trực tuyến (Live Demo)

Sử dụng ngay phiên bản đã được deploy tại: **[https://clamp.thaiduykhang.com/](https://clamp.thaiduykhang.com/)**

---

## 🌟 Tính năng nổi bật

- **Tạo hàm `clamp()` tự động:** Nhập vào kích thước tối thiểu, tối đa và công cụ sẽ tự động tính toán viewport width và sinh ra mã CSS `clamp()` chính xác.
- **Tính năng mới - Hỗ trợ xuất ra Pixel (`px`):** Rất hữu ích khi bạn cần tạo `clamp()` cho các giá trị âm (negative values) như `margin`, `translate`, `top/left/right/bottom`,...
- **Giao diện trực quan, dễ sử dụng:** Giữ nguyên trải nghiệm tinh giản của bản gốc, dễ dàng tinh chỉnh các tham số viewport và base size.

---

## ⚖️ So sánh chi tiết: Dự án này vs Bản gốc (walbo/font-size-clamp)

Dưới đây là bảng so sánh giúp người dùng hiểu rõ sự khác biệt và lý do phiên bản này ra đời:

| Tiêu chí | Bản gốc ([walbo/font-size-clamp](https://github.com/walbo/font-size-clamp)) | Phiên bản mở rộng này |
| :--- | :--- | :--- |
| **Mục đích chính** | Tạo hàm CSS `clamp()` cho typography và spacing cơ bản. | Tạo hàm CSS `clamp()` bao gồm cả hỗ trợ layout với negative spacing. |
| **Đơn vị đầu ra (Output)** | Chỉ xuất ra `rem`. Tốt cho accessibility nhưng gây khó khăn khi cần tính toán giá trị âm phức tạp. | Hỗ trợ xuất ra **cả `rem` và `px`**. Tùy chọn `px` đặc biệt an toàn và dễ kiểm soát cho các offset/margin âm. |
| **Xử lý giá trị âm (Negative Values)** | Tính toán các số âm trên đơn vị `rem` đôi khi hoạt động không như ý muốn (do phụ thuộc vào root font-size thay đổi) hoặc sinh ra lỗi logic cực trị `min/max`. | Việc chuyển đổi hẳn công thức tính `vw` và base sang `px` giúp hàm `clamp()` tính toán tuyệt đối và dễ dự đoán ranh giới min-max. |
| **Ứng dụng thực tế** | Thích hợp cho Font-size, Padding, Margin dương. | Thích hợp cho toàn bộ hệ thống UI, kể cả các thành phần đòi hỏi margin âm (kéo giãn layout) hoặc translate âm. |

### 🔍 Tại sao lại cần đơn vị `px` cho giá trị âm?

Trong CSS, khi bạn sử dụng hàm `clamp(MIN, VAL, MAX)` với các số âm (ví dụ: `margin-top: clamp(-5rem, ... , -2rem)`), cấu trúc toán học của nó đòi hỏi MIN phải là số nhỏ hơn (như `-5rem`) và MAX là số lớn hơn (`-2rem`). 

Sự kết hợp giữa các giá trị âm, đơn vị tương đối `rem` và sự co giãn của `vw` đôi khi dẫn đến những side-effect (tác dụng phụ) khó lường trên các trình duyệt khác nhau nếu người dùng cấu hình hệ thống root font-size khác biệt. Hoặc đơn giản là nó khiến UI developer khó hình dung chính xác giao diện sẽ co giãn ra sao.

Bằng cách hỗ trợ xuất trực tiếp công thức ra **`px`**, giá trị bên trong `clamp()` trở nên cố định (tuyệt đối) so với viewport hiện tại, loại bỏ sự rắc rối của việc quy đổi ngược qua `rem`, giải quyết triệt để vấn đề cho các developers cần sử dụng margin âm cho các layout đặc thù.

---

## 🚀 Hướng dẫn cài đặt & Chạy cục bộ

Dự án này được build bằng [Next.js](https://nextjs.org/).

1. **Clone repository:**
   ```bash
   git clone <url-repo-cua-ban>
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

Dự án này kế thừa giấy phép từ bản gốc (MIT License). Vui lòng xem file [LICENSE](./LICENSE) để biết thêm chi tiết. Xin gửi lời cảm ơn đến tác giả [walbo](https://github.com/walbo) vì ý tưởng gốc và nền tảng giao diện tuyệt vời!
