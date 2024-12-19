document.getElementById('gift-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const id = Math.floor(Math.random() * 1000); // ID aléatoire
    const giftName = document.getElementById('gift-name').value;
    const firstName = document.getElementById('recipient-name').value;
    const lastName = document.getElementById('recipient-name2').value;
    const address = document.getElementById('recipient-address').value;
  
    const gift = {
      id: id.toString(), // DynamoDB attend une chaîne pour les nombres
      gift_name: giftName,
      first_name: firstName,
      last_name: lastName,
      address: address,
    };
  
    try {
      const response = await fetch('http://localhost:5000/add-gift', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gift),
      });
  
      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        document.getElementById('gift-form').reset();
        addGiftToList(gift);
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Une erreur est survenue.');
    }
  });
  
  function addGiftToList(gift) {
    const list = document.getElementById('gift-list');
    const listItem = document.createElement('li');
    listItem.textContent = `${gift.gift_name} pour ${gift.first_name} ${gift.last_name} (${gift.address})`;
    list.appendChild(listItem);
  }
  