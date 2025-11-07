document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("serviceForm");
  const successBox = document.getElementById("submitSuccess");

  if (!form) return;

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          "Accept": "application/json"
        }
      });

      if (res.ok) {
        form.reset();

        // 성공 토스트 표시
        if (successBox) {
          successBox.classList.add("show");
          setTimeout(() => {
            successBox.classList.remove("show");
          }, 8000); // 8초 후 자동 숨김
        }
      } else {
        alert("전송 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
      }
    } catch (err) {
      alert("네트워크 오류로 접수에 실패했습니다. 1544-6068로 문의 부탁드립니다.");
    }
  });
});
