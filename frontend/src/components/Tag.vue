<template>
    <div
      class="tag"
      :style="tagStyle"
    >
      {{ tag.name }}
    </div>
  </template>
  
  <script>
  export default {
    props: {
      tag: {
        type: Object,
        required: true,
        validator(value) {
          // Verifica che l'oggetto tag abbia 'name' e 'color' come stringhe
          return value && typeof value.name === 'string' && typeof value.color === 'string';
        }
      }
    },
    computed: {
      tagStyle() {
        return {
          backgroundColor: this.tag.color,  // Usa il colore di sfondo specificato
          color: this.getTextColor(this.tag.color),  // Calcola il colore del testo in base al colore di sfondo
          padding: '5px 10px',
          borderRadius: '12px',
          fontWeight: 'bold',
          display: 'inline-block',
          textAlign: 'center',
          margin: '2px',
        };
      }
    },
    methods: {
      // Funzione per determinare il colore del testo in base alla luminosità del colore di sfondo
      getTextColor(bgColor) {
        // Converte il colore HEX in RGB
        const r = parseInt(bgColor.slice(1, 3), 16);
        const g = parseInt(bgColor.slice(3, 5), 16);
        const b = parseInt(bgColor.slice(5, 7), 16);
  
        // Calcola la luminosità media usando la formula per determinare il contrasto
        const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  
        // Se la luminosità è inferiore a una certa soglia, usa il bianco per il testo, altrimenti il nero
        return luminance < 128 ? '#FFFFFF' : '#000000';
      }
    }
  };
  </script>
  
  <style scoped>
  .tag {
    font-size: 14px;
    cursor: pointer;
  }
  </style>
  