document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("serviceForm");
  const successBox = document.getElementById("submitSuccess");

  if (!form || !successBox) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("custName").value.trim();
    const phone = document.getElementById("custPhone").value.trim();
    const area = document.getElementById("custArea").value.trim();
    const issue = document.getElementById("issueType").value;
    const detail = document.getElementById("issueDetail").value.trim();

    if (!name || !phone) {
      alert("성함과 연락처는 필수입니다.");
      return;
    }

    /* ------------------------
       1) 접수 즉시 팝업 표시
    ------------------------ */
    successBox.classList.add("show");

    /* 폼 초기화 */
    form.reset();

    /* ------------------------
       2) Google Apps Script 전송
    ------------------------ */
    fetch("https://script.google.com/macros/s/AKfycbxffLjW0qwdB6dZdDdhaANlvFby9F_JqREkpK3Hs49XYs_-fr4NIGxoTyN7lBoM1kAt-Q/exec", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "성함": name,
        "연락처": phone,
        "지역/주소": area,
        "고장 증상": issue,
        "상세 설명": detail
      })
    })
    .then(response => {
      console.log("GAS 응답:", response);
      // 성공/실패와 상관없이 팝업은 이미 떠 있음
    })
    .catch(err => {
      console.error("전송 오류:", err);
      // 오류여도 팝업은 이미 떠 있음
    });

    /* ------------------------
       3) 6초 후 팝업 자동 제거
    ------------------------ */
    setTimeout(() => {
      successBox.classList.remove("show");
    }, 6000);

  });
});
