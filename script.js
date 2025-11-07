document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("serviceForm");
  const successBox = document.getElementById("submitSuccess");

  if (!form || !successBox) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    try {
      // FormSubmit AJAX 엔드포인트 (페이지 안에서 전송 & 이동 없음)
      await fetch("https://formsubmit.co/ajax/noteservice@outlook.kr", {
        method: "POST",
        body: formData
      });

      // 폼 비우기
      form.reset();

      // 성공 팝업 보여주기
      successBox.classList.add("show");

      // 5초 후 자동으로 숨기기
      setTimeout(() => {
        successBox.classList.remove("show");
      }, 5000);
    } catch (err) {
      alert("접수 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
      console.error(err);
    }
  });
});
