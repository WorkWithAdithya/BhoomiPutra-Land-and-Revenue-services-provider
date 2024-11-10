function ServiceCard({ service, onClick }) {
  return (
    <div
      className="p-4 sm:p-5 md:p-6 border rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
      onClick={onClick}
    >
      <h2 className="text-lg sm:text-xl md:text-2xl font-sans font-semibold mb-2 transition-all duration-300">
        {service.name}
      </h2>

      <p className="text-gray-700 text-sm sm:text-base md:text-lg">
        Price: ₹{service.price}
      </p>
    </div>
  );
}

export default ServiceCard;
