// video 1
document.addEventListener("DOMContentLoaded", () => {  
    const circle = document.querySelector('.circle')
    circle.style.transition = "width 0.1s, height 0.1s, opacity 0.1s";
    let size = 0;
    setInterval(() => {
      size = size >= 500 ? 0 : size + 10;
      circle.style.width = `${size}px`;
      circle.style.height = `${size}px`;
    }, 100);
  });


//video 2
  (function () {
    const shape = document.querySelector(".shape");
    const ctx = shape.getContext("2d");
  
    // Đặt canvas chiếm toàn màn hình
    function resizeShape() {
      shape.width = window.innerWidth;
      shape.height = window.innerHeight;
    }
    resizeShape();
    window.addEventListener("resize", resizeShape);
  
    // Các tham số định vị và kích thước thanh
    const barWidth = 4; // Chiều rộng mỗi thanh
    const initialLeft = 200; // Vị trí trái ban đầu
    const initialTop = 70; // Vị trí trên ban đầu
    const verticalOffset = 1; // Mỗi thanh dời xuống 1px so với thanh trước
    const skewAngle = 45; // Góc skew (đơn vị độ)
    const skewFactor = Math.tan((skewAngle * Math.PI) / 180);
  
    // Mảng chứa 4 mã màu bắt đầu theo chu kỳ
    const cycleColors = [
      { r: 196, g: 10, b: 10 }, // Đỏ sẫm
      { r: 0, g: 0, b: 255 }, // Xanh dương
      { r: 245, g: 63, b: 250 }, // Hồng nhạt
      { r: 255, g: 20, b: 147 }, // Hồng đậm
    ];
  
    let currentColorIndex = 0; // chỉ số màu bắt đầu hiện tại
    let currentBarIndex = 0; // số thứ tự thanh trong dãy hiện tại
    let lastTime = 0; // dùng để điều chỉnh tốc độ vẽ
  
    function draw(timestamp) {
      if (!lastTime) lastTime = timestamp;
      // Giới hạn vẽ khoảng mỗi 10ms (~50fps)
      if (timestamp - lastTime > 5) {
        // Tính lại chiều cao thanh theo canvas (30% chiều cao)
        const barHeight = shape.height * 0.3;
  
        // Vị trí trái của thanh hiện tại
        let leftPos = initialLeft + currentBarIndex * barWidth;
        // Tính vị trí x của "đuôi" (bottom–right) của thanh sau khi skew
        let tailX = leftPos + barWidth + skewFactor * barHeight;
  
        // Nếu đuôi thanh đã chạm cạnh phải, reset canvas và chuyển màu
        if (tailX >= shape.width) {
          ctx.clearRect(0, 0, shape.width, shape.height);
          currentColorIndex = (currentColorIndex + 1) % cycleColors.length;
          currentBarIndex = 0;
          lastTime = timestamp;
          requestAnimationFrame(draw);
          return;
        }
  
        // Tính hệ số nội suy t (0 khi chưa di chuyển, 1 khi đuôi chạm cạnh)
        let maxRange = shape.width - initialLeft - (barWidth + skewFactor * barHeight);
        let t = (currentBarIndex * barWidth) / maxRange;
        if (t > 1) t = 1;
  
        // Tăng giá trị t lên để màu trắng xuất hiện nhiều hơn
        let bias = 0.001; // Điều chỉnh để tăng phần trắng
        let adjustedT = Math.pow(t, 0.5) + bias;
        if (adjustedT > 1) adjustedT = 1; // Giữ trong phạm vi 0-1
  
        const startColor = cycleColors[currentColorIndex];
        const r = Math.round(startColor.r + adjustedT * (255 - startColor.r));
        const g = Math.round(startColor.g + adjustedT * (255 - startColor.g));
        const b = Math.round(startColor.b + adjustedT * (255 - startColor.b));
        const color = `rgb(${r}, ${g}, ${b})`;
  
        // Tính vị trí trên của thanh
        let topPos = initialTop + currentBarIndex * verticalOffset;
  
        // Vẽ thanh màu bằng fillRect (không khung)
        ctx.save();
        ctx.translate(leftPos, topPos);
        ctx.transform(1, 0, skewFactor, 1, 0, 0);
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, barWidth, barHeight);
        ctx.restore();
  
        currentBarIndex++;
        lastTime = timestamp;
      }
      requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);
  })();
  