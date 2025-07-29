function Person(name, role, email) {
  this.name = name;
  this.role = role;
  this.email = email;

  this.getCardHTML = function () {
    return `
      <div class="card">
        <h2>${this.name}</h2>
        <p><strong>Role:</strong> ${this.role}</p>
        <p><strong>Email:</strong> ${this.email}</p>
      </div>
    `;
  };
}

function generateCards(peopleArray) {
  const container = document.getElementById("card-container");

  peopleArray.forEach(function(personObj) {
    const person = new Person(personObj.name, personObj.role, personObj.email);
    container.innerHTML += person.getCardHTML();
  });
}

const peopleData = [
  { name: "Elon Musk", role: "Tech Entrepreneur", email: "elon@tesla.com" },
  { name: "Sundar Pichai", role: "CEO, Google", email: "sundar@google.com" },
  { name: "Abhay Shanbhag", role: "Founder, Javacript", email: "abhay@js.ai" }
];

generateCards(peopleData);
