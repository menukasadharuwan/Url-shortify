const button = document.getElementById("urlbutton");

async function sendurl() {
  const url = document.getElementById("url").value;
  const result = document.getElementById("result");
  const copybutton = document.getElementById("copybutton");

  try {
    const send = await fetch("http://localhost:3000/url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        original: url,
      }),
    });

    const data = await send.json();
    result.textContent = data.url;

    //copy button
    copybutton.addEventListener("click",async()=>{
        try{
            await navigator.clipboard.writeText(data.url);
            copybutton.textContent = "Copied";

        }
        catch{
            
        }
        setInterval(()=>{
            copybutton.textContent = "Copy"
        },3000)
    })

    await navigator.clipboard.writeText(url);
    console.log(data.url);

    if (data.ok) {
      console.log(data.url);
    }
  } catch {
    console.log("error");
  }
}

button.addEventListener("click", sendurl);



