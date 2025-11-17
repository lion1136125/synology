document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("serviceForm");
  const successBox = document.getElementById("submitSuccess");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("custName").value.trim();
    const phone = document.getElementById("custPhone").value.trim();
    const area = document.getElementById("custArea").value.trim();
    const issueType = document.getElementById("issueType").value;
    const issueDetail = document.getElementById("issueDetail").value.trim();

    if (!name || !phone) {
      alert("성함과 연락처는 필수입니다.");
      return;
    }

    // Google Script Endpoint
    const endpoint = "https://script.google.com/macros/s/AKfycbwR5_tF5BkhE5EVFeQsjDf4IUtw1wytJsNDb7I2C2IXFhljkjiThcjT2sCz3Pta4VsASg/exec";

    const payload = {
      "성함": name,
      "연락처": phone,
      "지역/주소": area,
      "고장 증상": issueType,
      "상세 설명": issueDetail
    };

    try {
      await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" }
      });

      // ---- 성공 팝업 띄우기 ----
      if (successBox) {
        successBox.classList.add("show");
        successBox.style.display = "block";

        setTimeout(() => {
          successBox.classList.remove("show");
          successBox.style.display = "none";
        }, 3500);
      }

      form.reset();
    } catch (err) {
      console.error("전송 오류:", err);
      alert("서버 통신 오류가 발생했습니다. 다시 시도해주세요.");
    }
  });
});

// ===== Desktop: Disable tel links =====
(function(){
  function disableTelOnDesktop(){
    if (window.matchMedia && window.matchMedia('(min-width: 960px)').matches){
      document.querySelectorAll('a[href^="tel:"]').forEach(function(a){
        a.addEventListener('click', function(e){ e.preventDefault(); }, { passive:false });
        a.style.cursor = 'default';
      });
    }
  }
  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', disableTelOnDesktop);
  } else {
    disableTelOnDesktop();
  }
  window.addEventListener('resize', disableTelOnDesktop);
})();
