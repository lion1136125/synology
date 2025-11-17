document.addEventListener("DOMContentLoaded",()=>{
  const form=document.getElementById("serviceForm");
  const success=document.getElementById("submitSuccess");
  form.addEventListener("submit",(e)=>{
    e.preventDefault();
    success.style.display="block";
    form.reset();
  });
});
