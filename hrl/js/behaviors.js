console.log(window.location.search.slice(1));

let c = new CETEI();
c.getHTML5('BenZvi_Goldberg.xml', function(data) {
  document.getElementById("letter").appendChild(data);
});
let behaviors = {
  "tei": {
    "head": function(e) {
      let level = document.evaluate("count(ancestor::tei-div)", e, null, XPathResult.NUMBER_TYPE, null);
      let result = document.createElement("h" + level.numberValue);
      for (let n of Array.from(e.childNodes)) {
        result.appendChild(n.cloneNode());
      }
      return result;
    },
    "lb": ["<br/>"],
    "placeName": function(pn){
      if (pn.hasAttribute('ref')) {
        var linked = document.createElement("a");
        linked.setAttribute('href', pn.getAttribute('ref'));
        linked.setAttribute('target', '_blank');
        linked.innerHTML = pn.innerHTML;
        return linked;
      }

    },
    "persName": function(pn){
      if (pn.hasAttribute('ref')) {
        var linked = document.createElement("a");
        linked.setAttribute('href', pn.getAttribute('ref'));
        linked.setAttribute('target', '_blank');
        linked.innerHTML = pn.innerHTML;
        return linked;
      }

    },
    "graphic": function(gr){
      var holder = document.createElement("a");
      holder.setAttribute('href', gr.getAttribute("url"));
      let content = new Image();
      content.src = this.rw(gr.getAttribute("url"));
      content.setAttribute('class', 'uk-img');
      content.setAttribute('data-source', gr.getAttribute("url"));
      content.setAttribute('href', gr.getAttribute("url"));
      content.setAttribute("width", "500px");
      holder.appendChild(content);
      document.getElementById('facsimile').appendChild(holder);
    },
    "choice": function(ch){
      if (ch.querySelector("tei-corr")) {
        var spansic = document.createElement("span");
        spansic.setAttribute("class", "sic");
        spansic.setAttribute("uk-tooltip", ch.querySelector('tei-corr').innerHTML);
        spansic.appendChild(ch.querySelector('tei-sic'))
        return spansic;
      } else if (ch.querySelector("tei-expan")) {
        var spanabbr = document.createElement("span");
        spanabbr.setAttribute("class", "abbr");
        spanabbr.setAttribute("uk-tooltip", ch.querySelector('tei-expan').innerHTML);
        spanabbr.appendChild(ch.querySelector('tei-abbr'))
        return spanabbr;
      }


    },
    "correspDesc": function(e) {
      let sender = e.querySelector('tei-correspAction[type="sent"]>tei-persName');
      let recipient = e.querySelector('tei-correspAction[type="received"]>tei-persName');
      let dateSent = e.querySelector('tei-correspAction[type="sent"]>tei-date').getAttribute("when");
      let placeSent = e.querySelector('tei-correspAction[type="sent"]>tei-settlement');
      let placeReceived = e.querySelector('tei-correspAction[type="received"]>tei-settlement');


      document.getElementById('data-sender').appendChild(sender);
      document.getElementById('data-recipient').appendChild(recipient);
      document.getElementById('data-dateSent').innerHTML = dateSent;
      document.getElementById('data-placeSent').appendChild(placeSent);
      document.getElementById('data-placeReceived').appendChild(placeReceived );
    },

  }
};
c.addBehaviors(behaviors);
