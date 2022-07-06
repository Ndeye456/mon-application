const balance = document.getElementById(
    "balance"
);
const money_plus = document.getElementById(
    "money-plus"
);
const money_minus = document.getElementById(
    "money-minus"
);
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
// Crée un tableau (Array) et objet
//const dummyTransactions = [
/* { id: 1, text: "Flower", amount: -20 },
 { id: 2, text: "Salary", amount: 300 },
 { id: 3, text: "Book", amount: -10 },
 { id: 4, text: "Camera", amount: -150 },
];*/
//let transactions = dummyTransactions;
//Denière parti
const localStorageTransactions = JSON.parse(localStorage.getItem("transactions"));
let transactions = localStorage.getItem("transactions") !== null ? localStorageTransactions : [];
//Ajouter une Transaction
//La méthode preventDefault() annule l'événement s'il est annulable, ce qui signifie que l'action par défaut qui appartient à l'événement ne se produira pas.
//En cliquant sur un bouton "Soumettre", l'empêcher de soumettre un formulaire

/*La trim()méthode supprime les espaces des deux côtés d'une chaîne.
La trim()méthode ne modifie pas la chaîne d'origine.*/
function addTrasaction(e) {
    e.preventDefault();
    if (
        text.value.trim() === "" || amount.value.trim() === "") {
        alert("Please; Entrez un Texte et un valeur");
    } else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value,
        };
        transactions.push(transaction);
        addTransactionDOM(transaction);
        updateValues();
        updateLocalStorage();
        text.value = "";
        amount.value = "";
    }
}
//Générér un identifiant aléatoire (ID)
function generateID() {
    //La Math.floor()méthode pour arrondit un nombre vers le bas à l'entier le plus proche.
    //2,5 sera arrondi vers bas (2).
    // La Math.round()méthode arrondit un nombre à l'entier le plus proche.
    //2,5 sera arrondi vers le haut (3).
    return Math.floor(Math.random() * 100000000);
}
//Ajouter des transactions à la liste DOM
function addTransactionDOM(transaction) {
    //OBTENIR le sign
    const sign = transaction.amount < 0 ? "-" : "+";
    const item = document.createElement("li");
    //Ajouter une class basée sur la valeur
    item.classList.add(
        transaction.amount < 0 ? "minus" : "plus"
    );
    //La Math.abs() méthode qui renvoie la valeur absolue d'un nombre.
    item.innerHTML = `
${transaction.text}<span>${sign}${Math.abs(
        transaction.amount
    )}</spans>
        <button class="delete-btn" onclick="removeTransaction(${transaction.id
        })">x</button>
        <button class="modifier-btn" onclick="modifTransaction(${transaction.id
        })">M</button>
`;
    //location.reload();
    //appendChild()  méthode qui permet d'ajoute un nœud (élément) en tant que dernier enfant d'un élément.
    list.appendChild(item);
};

function modifTransaction(id) {
    console.log(id);
}

//.addEventListener('onclick', modiftransaction)


/*La méthode filter()crée et retourne un nouveau tableau contenant tous les éléments du tableau 
d'origine qui renvoient une condition rendue par la fonction callback.
La fonction de test (ou prédicat ) à appliquer à chaque élément du tableau.*/
//Remove : supprimer la transaction pae ID
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id
    );
    //init est juste un raccourci pour initié. Généralement, il est utilisé pour créer un "nouvel objet ()".
    Init();
}
function updateTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id
    );
}
Init();

//Update updateValues : mettre à jour un valeur  balance, income, expence

/*La méthode Array.map() crée un nouveau tableau à partir des résultats de 
l'appel d'une fonction pour chaque élément.*/
function updateValues() {
    const amounts = transactions.map(
        (transaction) => transaction.amount
    );
    // Reduce()Calcule la somme des nombres arrondis dans un tableau.
    //toFixed() méthode arrondit la chaîne à un nombre spécifié de décimales.
    const total = amounts
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);
    const income = amounts
        .filter((item) => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);
    const expense =
        (amounts
            .filter((item) => item < 0)
            .reduce((acc, item) => (acc += item), 0) *
            - 1).toFixed(2);
    balance.innerText = `${total}CFA`;
    money_plus.innerText = `${income}CFA`;
    money_minus.innerText = `${expense}CFA`;
}
//dernier
//update Local Storage
function updateLocalStorage() {
    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );
}

//La méthode forEach() permet d'exécuter une fonction donnée sur chaque élément du tableau.
// initialiser l'application  
//INIT: initialiser l'application 
//innerHTML nous permet de recupécure ce qui à l'intérieur d'un élément html
function Init() {
    list.innerHTML = "";
    transactions.forEach(addTransactionDOM);
    updateValues();
}

Init();

form.addEventListener("submit", addTrasaction);
form.addEventListener("update", addTrasaction);
