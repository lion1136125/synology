
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

    const endpoint = "https://script.google.com/macros/s/AKfycbwR5_tF5BkhE5EVFeQsjDf4IUtw1wytJsNDb7I2C2IXFhljkjiThcjT2sCz3Pta4VsASg/exec";

    try {
      await fetch(endpoint, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          "성함": name,
          "연락처": phone,
          "지역/주소": area,
          "고장 증상": issueType,
          "상세 설명": issueDetail
        })
      });
    } catch (err) { console.error(err); }

    if (successBox) successBox.style.display = "block";
    form.reset();
  });
});
