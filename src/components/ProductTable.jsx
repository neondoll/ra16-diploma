import PropTypes from "prop-types";

function ProductTable({ item }) {
  return (
    <table className="table table-bordered">
      <tbody>
        <tr>
          <td>Артикул</td>
          <td>{item.sku || null}</td>
        </tr>
        <tr>
          <td>Производитель</td>
          <td>{item.manufacturer || null}</td>
        </tr>
        <tr>
          <td>Цвет</td>
          <td>{item.color || null}</td>
        </tr>
        <tr>
          <td>Материалы</td>
          <td>{item.material || null}</td>
        </tr>
        <tr>
          <td>Сезон</td>
          <td>{item.season || null}</td>
        </tr>
        <tr>
          <td>Повод</td>
          <td>{item.reason || null}</td>
        </tr>
      </tbody>
    </table>
  );
}

ProductTable.propTypes = {
  item: PropTypes.shape({
    sku: PropTypes.string.isRequired,
    manufacturer: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    material: PropTypes.string.isRequired,
    season: PropTypes.string.isRequired,
    reason: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductTable;
