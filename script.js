document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("serviceForm");
  const successBox = document.getElementById("submitSuccess");

  if (!form || !successBox) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // 폼 데이터 → 일반 객체로 변환
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // 여기서 추가로 제목/템플릿 값 지정 (필요하면 변경)
    if (!data._subject) {
      data._subject = "Synology 서비스센터 온라인 접수";
    }
    if (!data._template) {
      data._template = "table";
    }

    try {
      const res = await fetch("https://formsubmit.co/ajax/noteservice@outlook.kr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(data)
      });

      // 응답이 200~299 가 아니면 오류 처리
      if (!res.ok) {
        console.error("FormSubmit error status:", res.status);
        throw new Error("FormSubmit 요청 실패");
      }

      // 혹시 응답 내용 확인하고 싶으면
      // const json = await res.json();
      // console.log("FormSubmit response:", json);

      // 폼 비우기
      form.reset();

      // 성공 팝업 띄우기
      successBox.classList.add("show");
      setTimeout(() => successBox.classList.remove("show"), 5000);

    } catch (err) {
      alert("접수 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
      console.error("FormSubmit AJAX error:", err);
    }
  });
});
