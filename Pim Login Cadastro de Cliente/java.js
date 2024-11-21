document.getElementById('telefone').addEventListener('input', function (e) {
   
    this.value = this.value.replace(/\D/g, '');
  
   
    if (this.value.length > 10) {
      this.value = this.value.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    } else if (this.value.length > 5) {
      this.value = this.value.replace(/^(\d{2})(\d{5})$/, '($1) $2');
    } else if (this.value.length > 2) {
      this.value = this.value.replace(/^(\d{2})/, '($1)');
    }
  });
  