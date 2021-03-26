import { useEffect, useState } from "react";
import "./App.css";

// Fausse data qui pourrait venir de l'api
const fakeData = {
  title: [
    {
      value: "Développeuse un métier passionnant",
    },
  ],
  student: [
    {
      name: "Clémence",
      age: 19,
    },
  ],
  languages: [{ front: "React", back: "PHP" }],
  friends: [
    { name: "Jack", age: 25 },
    { name: "John", age: 19 },
    { name: "Manon", age: 30 },
  ],
};

// J'ai mis un console dans le useEffect et un autre plus loin avant le return
// Ouvre ta console dans chrome et tu verras l'ordre d'exécution
// Tu vas constater que le deuxième console avant le return est exécuté en premier et que "items" est d'abord un objet vide avant d'être mis à jour

function App() {
  const [items, setItems] = useState({});

  useEffect(() => {
    console.log("useEffect for fetch called!!!");
    // Supposons qu'on fasse un fecth ici et que le fetch nous retourne fakeData
    setItems(fakeData);
  }, []);

  /*
  Si tu regardes tes console log dans le navigateur tu verras qu'au premier render items est juste un object vide `{}`

  Du coup, si tu as dans ton return quelque chose comme:
  items.student[0] tu avoir une erreur car items.student est égal à undefined au premier rendu 

  Donc c'est comme si tu faisais undefined[0], ce qui va causer une erreur

  Maintenant pour éviter d'avoir une erreur le temps que le state sois mis à jour dans le useEffect, il y a plusieurs options, parmi lesquelles optional chaining operator (?.)

  Si tu écris ça items.student?.[0] au lieu de ça items.student[0]
  tu n'auras pas l'erreur au premier rendu même items est égal à un objet vide
  Cette expression items.student?.[0] veut dire que si items.student est à égal à null ou undefined arrête-toi immédiatement, pas besoin d'aller chercher le premier élément du tableau 

  Du coup, [0] ne sera pas exécuté au premier rendu si l'objet est vide

  Par contre, pas besoin du premier "?." après items ici : items?.student?.[0]
  Le premier "?." après items n'est pas nécessaire car dans tous les cas items.student va être exécuté, s'il ne l'exécute pas il ne peut pas savoir s'il y a une valeur ou si au contraire c'est null ou undefined

  Si tu avais juste ça : items.student dans ton return, tu n'auras jamais une erreur car ça va juste retourner undefined

  Mais si t'as ça items.student[0], c'est comme si tu faisais undefined[0] et ça cause une erreur, le "?." qu'on rajoute devant "[0]" permet de ne pas exécuter undefined[0] et d'éviter ansin l'erreur

  Tu peux donc enlever dans ton code le premier "?.", tout juste après "item" ou "items" je ne sais plus si c'est au singulier ou au pluriel chez toi, car ça ne sert à rien comme je viens de l'expliquer plus haut

  ***********

  Maintenant voici une autre solution concernant l'erreur que tu peux avoir au premier rendu
  Si t'es sûre que ton object contiendra "title" quand le state sera mis à jour
  tu peux juste mettre avant ton return actuel :
  if(!items.title) return null

  De ce fait, tant que le state n'est pas mis à jour, le deuxième return ne sera pas exécuté donc pas d'erreur possible si code non exécuté ^^

  PS: ici "items" correspond au nom de mon state (ligne 30, qui sera mis à jours dans le useEffect), chez moi il est pluriel mais il me semble que tu l'a mis au singulier chez toi

  
  */

  console.log("items is rendered on dom", items);

  // Si tu décommentes la ligne qui suit, plus besoin de rajouter "?."
  // if (!items.title) return null;

  return (
    <div className="App">
      <p>titre : {items.title?.[0].value}</p>
      <p>étudiante : {items.student?.[0].name}</p>
    </div>
  );
}

export default App;
