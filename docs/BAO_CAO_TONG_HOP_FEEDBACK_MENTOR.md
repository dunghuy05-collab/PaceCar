# Báo cáo tổng hợp tính năng và xử lý feedback mentor — PaceCar

**Ngày tổng hợp:** 11/10/2026  
**Ứng dụng:** [PaceCar — Thuê xe an toàn](https://pacecarf.onrender.com/)  
**Phạm vi:** Các feedback trong báo cáo QA frontend, đợt tái thiết kế UI/UX,
đăng ký tài khoản, sửa lỗi sau QA và cập nhật vòng đời booking.

## 1. Tóm tắt

PaceCar đã được bổ sung luồng đăng ký cho người thuê/chủ xe, làm mới giao diện
và chuẩn hóa một số thành phần dùng chung. Các feedback về lỗi crash trang
Cảnh báo rủi ro, tràn giao diện mobile, hiển thị đánh giá không nhất quán,
validation wizard, khả năng truy cập và phục hồi tìm kiếm đã được xử lý.

Sau kiểm thử production, vòng đời booking quá hạn được cập nhật để không giữ
các yêu cầu cũ ở trạng thái có thể tiếp tục chấp nhận; quyền truy cập
Cảnh báo rủi ro cũng được giới hạn cho chủ xe và admin. Báo cáo phân biệt các
nội dung đã triển khai với các hạng mục còn cần xác minh hoặc cải thiện.

## 2. Tính năng đã thêm

- **Đăng ký người dùng:** route `/register`, cho phép chọn vai trò người thuê
  hoặc chủ xe; có kiểm tra họ tên, email, số điện thoại, mật khẩu, xác nhận mật
  khẩu và chấp thuận điều khoản.
- **Trạng thái đăng ký rõ ràng:** hiện/ẩn mật khẩu, thông báo lỗi theo trường,
  trạng thái đang gửi, xử lý email trùng và lỗi mạng; đăng nhập sau khi đăng ký
  thành công.
- **Bảo vệ đăng ký phía backend:** chỉ chấp nhận hai vai trò renter/owner,
  băm mật khẩu, lưu phiên bản consent và tạo session; không cho tự đăng ký
  admin.
- **Trang thông tin điều khoản:** thêm `/terms` và `/privacy` với nội dung demo,
  ghi rõ cần rà soát pháp lý trước khi sử dụng production.
- **Giao diện landing mới:** bố cục, lời gọi hành động, token màu sắc và thành
  phần giao diện dùng chung được chuẩn hóa; bổ sung minh họa xe drift SVG/CSS
  tự tạo.
- **Hỗ trợ chuyển động có kiểm soát:** hiệu ứng hero chạy một lần, tạm dừng
  hiệu ứng nền khi tab ẩn và tôn trọng `prefers-reduced-motion`.
- **Tài liệu thiết kế và kiểm thử:** bổ sung design system, báo cáo QA sau
  redesign, báo cáo triển khai cuối và bộ ảnh/bằng chứng kiểm thử.

## 3. Các cải thiện theo feedback

| Khu vực | Cải thiện |
| --- | --- |
| Tìm kiếm xe | Bố trí SearchBar phù hợp mobile; giữ tiêu chí trên URL; bổ sung trạng thái lỗi ngày không hợp lệ và nút quay lại sửa thời gian. |
| Danh sách xe | Lọc, sắp xếp, đặt lại bộ lọc và trạng thái không có kết quả rõ ràng; không hiển thị sao khi xe chưa có review hợp lệ. |
| Trang chi tiết | Đồng bộ cách thể hiện rating/review; empty state đánh giá rõ ràng; báo giá và chi phí được trình bày theo từng khoản. |
| Đăng xe | Wizard kiểm tra từng bước trước khi cho tiếp tục; báo cụ thể trường còn thiếu và giữ bản nháp cục bộ. |
| Cảnh báo rủi ro | Sửa đường hiển thị ngày, bổ sung xử lý lỗi; quyền truy cập route/API được phân vai owner/admin. |
| Booking quá hạn | Tự chuyển booking cũ sang `Expired`; booking `Ongoing` đã qua hạn thuê chuyển sang `Check-out Review`; ghi audit log và thông báo cho các bên. |
| Quản lý booking | Thêm trạng thái `Expired` vào badge/bộ lọc; booking hết hạn không còn được chấp nhận hoặc giữ chỗ như booking đang hoạt động. |
| Accessibility | Thêm skip link và một main landmark thống nhất; lỗi đăng nhập dùng alert và liên kết với trường nhập; chuẩn hóa tên/ARIA cho điều khiển; loại bỏ link/button lồng nhau. |
| Responsive | Sửa tràn ngang SearchBar/loading mobile; sửa thêm hàng trạng thái dashboard chủ xe bị tràn ở viewport 1024 px. |
| Lỗi và tải dữ liệu | Cải thiện error state/retry, validation biểu mẫu và các trạng thái loading/empty; tránh để lỗi runtime làm mất toàn bộ ứng dụng trong các tình huống đã xác định. |

## 4. Bug đã sửa từ feedback mentor/QA

| Bug được ghi nhận | Cách xử lý | Kết quả xác minh |
| --- | --- | --- |
| `/risk-alerts` crash với `date is not defined` | Sửa logic định dạng ngày dùng chung trong trang cảnh báo | Route Owner/Admin tải được trong QA production sau deploy. |
| SearchBar tràn tới 492 px trên mobile 430 px | Điều chỉnh kích thước/grid của trường ngày-giờ để co theo container | Kiểm tra mobile không còn tràn ngang. |
| Card tìm xe hiện rating dù chưa có đánh giá | Chỉ hiện điểm sao khi có review count và rating hợp lệ; nếu không hiện trạng thái chưa có đánh giá | Xe không có review được kiểm tra trên card và API. |
| Trang chi tiết lặp thông báo chưa có đánh giá | Chuẩn hóa empty state, tránh đưa ra rating không có nguồn review | Kiểm tra xe chưa có review hiển thị trạng thái phù hợp. |
| Wizard đăng xe cho phép bỏ qua bước nhận diện rỗng | Validate các bước trước khi chuyển tiếp | Thử tiếp tục khi để trống vẫn ở bước đầu và chỉ rõ trường cần bổ sung. |
| CTA lồng anchor/button gây nhiều điểm Tab | Chuyển CTA sang một phần tử tương tác đúng ngữ nghĩa | Kiểm tra không còn các cặp link/button lồng nhau trong phạm vi QA. |
| URL ngày quá khứ trả lỗi tải dữ liệu và retry vô ích | Giữ form tìm kiếm, hiển thị lỗi có thể hiểu và hành động “Chọn lại thời gian” | Kiểm tra URL quá khứ và thao tác phục hồi về ngày hợp lệ. |
| Thiếu main landmark hoặc có landmark không đồng nhất theo trang | Dùng một `<main id="main-content">` ở layout chung; bỏ các main lồng nhau | Responsive regression matrix xác nhận một main landmark mỗi trang. |
| Lỗi đăng nhập không được screen reader thông báo/không gắn với input | Bổ sung `role="alert"`, `aria-invalid`, `aria-describedby`; xóa lỗi khi sửa trường | Kiểm tra đăng nhập sai và việc xóa thông báo khi chỉnh sửa. |
| Tràn 1 px ở dashboard chủ xe tại 1024 px | Cho hàng loại/trạng thái trong thẻ cảnh báo/lịch được wrap | Ma trận 90 route/role/viewport sau sửa không ghi nhận tràn. |
| Booking quá hạn vẫn giữ trạng thái Pending/Ongoing | Tự đối soát trạng thái theo ngày thuê; ghi audit log và gửi notification | Backend smoke tests xác nhận trạng thái hết hạn và từ chối chuyển trạng thái không hợp lệ. |
| Renter truy cập Risk Alerts nhận lỗi 403 như lỗi tải dữ liệu | Thêm route guard riêng cho owner/admin | API từ chối renter; UI điều hướng user không đủ vai trò theo guard. |

## 5. Kiểm thử và kết quả

- `npm test`: backend smoke tests bao gồm đăng ký, session, booking, phân quyền,
  Risk Alerts và đối soát trạng thái booking.
- `npm run build --prefix client`: production build hoàn tất.
- Kiểm thử browser responsive sau remediation: 90 tổ hợp route/role/viewport ở
  các độ rộng 1920, 1440, 1024, 768 và 430 CSS px; không phát hiện tràn ngang,
  thiếu main landmark hoặc lỗi runtime trong các trang được chọn.
- Kiểm thử production trực tiếp: 20 lượt route public ở desktop/mobile; thêm
  18 route theo vai trò renter/owner/admin ở mobile; các trang đã kiểm tra tải
  và không tràn ngang.
- Tìm kiếm: kiểm tra validation thời gian, lọc SUV, đặt lại bộ lọc, sắp xếp giá,
  empty state và khôi phục URL ngày quá khứ.
- Xác thực: kiểm tra đăng nhập đúng/sai, đăng xuất, route guard, validation
  đăng ký không hợp lệ và vô hiệu token sau logout.
- Kiểm tra thao tác booking có kiểm soát: theo sự cho phép của người dùng, tạo
  một booking QA duy nhất rồi chủ xe từ chối. Booking kết thúc ở `Rejected`,
  tiền cọc `Unpaid`; bản ghi/audit/notification vẫn tồn tại trên production.
  Không thực hiện thanh toán và không xóa dữ liệu.

## 6. Phạm vi chưa hoàn tất hoặc còn cần theo dõi

- Nội dung `/terms` và `/privacy` vẫn là demo; cần được pháp lý/quyền riêng tư
  rà soát trước khi mở đăng ký thật.
- Chưa xác minh toàn bộ luồng mutation production như thanh toán mô phỏng, ký
  hợp đồng, upload ảnh/giấy tờ, gửi tranh chấp, chỉnh hồ sơ, duyệt/tạm dừng xe,
  tạo ưu đãi hoặc gửi review.
- Chưa chạy kiểm thử WCAG đầy đủ bằng axe/screen reader, zoom 200–400%, thiết bị
  thật hoặc trình duyệt Firefox/Safari.
- Tối ưu ảnh responsive, lazy-load module quản trị, tự host font và đo Web
  Vitals trên mạng/thiết bị thật vẫn là đề xuất hiệu năng cần đánh giá riêng;
  không xem là hạng mục đã hoàn tất trong báo cáo này.
- Booking QA đã bị từ chối không bị xóa khỏi dữ liệu lịch sử; đây là hành vi có
  chủ đích theo yêu cầu kiểm thử. Không có thanh toán được ghi nhận cho booking
  này.

## 7. Tài liệu tham chiếu

- [Báo cáo feedback QA frontend ban đầu](./QA_FRONTEND_AUDIT_2026-10-07.md)
- [Báo cáo QA sau tái thiết kế và remediation](./QA_REPORT_AFTER_UI_REFACTOR.md)
- [Báo cáo triển khai cuối](./FINAL_IMPLEMENTATION_REPORT.md)
- [Design system](./DESIGN_SYSTEM.md)

