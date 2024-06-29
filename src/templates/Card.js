export default Card = (children) => {
  return `
    <div style="width: 50%; border: 1px solid #808080; border-radius: 5px" class="card">
      ${children}
    </div>
  `;
};
