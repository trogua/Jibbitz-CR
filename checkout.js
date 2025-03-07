const mp = new MercadoPago("TEST-ce494564-06ec-418f-9348-4d798239d13b", {
    locale: "es-AR",
  });
  
  async function createPayment() {
    const response = await fetch("https://jibbitz-cr.vercel.app/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Producto de prueba",
        price: 1000,
      }),
    });
  
    const data = await response.json();
  
    const checkout = mp.checkout({
      preference: {
        id: data.id,
      },
      render: {
        container: "#wallet_container",
        label: "Pagar",
      },
    });
  }
  