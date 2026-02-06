const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzMeHAD_PWS_g5nZjAZXcFgfeTO2idQkqVtshdusvRpHp6UgOWRgdWiUQL07onWywLQ-g/exec";

document.addEventListener("DOMContentLoaded", function(){

  const startBtn = document.getElementById("startBtn");
  const navApply = document.getElementById("navApply");
  const closeForm = document.getElementById("closeForm");
  const formWrapper = document.getElementById("formWrapper");

  function openForm(){
    formWrapper.classList.add("active");
    setTimeout(()=> {
      formWrapper.scrollIntoView({behavior:"smooth"});
    },200);
  }

  function close(){
    formWrapper.classList.remove("active");
  }

  startBtn?.addEventListener("click", openForm);
  navApply?.addEventListener("click", openForm);
  closeForm?.addEventListener("click", close);

});


/* ================== GOOGLE SHEET ================== */

const form = document.getElementById("leadForm");

if(form){

  const submitBtn = document.getElementById("submitBtn");
  const statusMsg = document.getElementById("statusMsg");

  function setStatus(msg,type="info"){
    statusMsg.textContent=msg;
    statusMsg.style.color=
      type==="success"?"#16a34a":
      type==="error"?"#dc2626":
      "rgba(255,255,255,0.7)";
  }

  form.addEventListener("submit", async (e)=>{
    e.preventDefault();

    const payload={
      fullName:fullName.value,
      email:email.value,
      phone:phone.value,
      pan:pan.value,
      employmentStatus:employmentStatus.value,
      pincode:pincode.value,
      monthlyIncome:monthlyIncome.value,
      loanAmount:loanAmount.value,
      page:window.location.href,
      source:"loangalaxy"
    };

    try{
      submitBtn.disabled=true;
      submitBtn.textContent="Submitting...";
      setStatus("Submitting...");

      await fetch(GOOGLE_SCRIPT_URL,{
        method:"POST",
        mode:"no-cors",
        headers:{ "Content-Type":"application/json" },
        body:JSON.stringify(payload)
      });

      setStatus("✅ Submitted successfully!","success");
      form.reset();
    }catch{
      setStatus("❌ Submission failed","error");
    }finally{
      submitBtn.disabled=false;
      submitBtn.textContent="Submit Application";
    }
  });
}


/* ================== STARFIELD ================== */

const canvas=document.getElementById("starCanvas");

if(canvas){
  const ctx=canvas.getContext("2d");
  let stars=[];

  function resize(){
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
  }

  resize();
  window.addEventListener("resize",resize);

  for(let i=0;i<160;i++){
    stars.push({
      x:Math.random()*canvas.width,
      y:Math.random()*canvas.height,
      r:Math.random()*1.5,
      s:Math.random()*0.7
    });
  }

  function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle="white";

    stars.forEach(star=>{
      star.y+=star.s;
      if(star.y>canvas.height){
        star.y=0;
        star.x=Math.random()*canvas.width;
      }
      ctx.beginPath();
      ctx.arc(star.x,star.y,star.r,0,Math.PI*2);
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  animate();
}
