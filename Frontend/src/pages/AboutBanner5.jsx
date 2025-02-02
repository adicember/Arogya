
const SelfAssessment = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-pink-800 mb-8">Treatment and Management</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Anxiety Card */}
        <div className="bg-purple-100 rounded-lg shadow-lg p-6 flex flex-col items-center text-center">
          <div className="bg-purple-300 rounded-full h-20 w-20 mb-4 flex items-center justify-center">
            {/* Replace with an actual image/icon */}
            <span className="text-purple-800 text-4xl font-semibold">🏋️‍♀️</span>
          </div>
          <h2 className="text-xl font-semibold text-purple-800"> Lifestyle Modifications</h2>
          <p className="text-gray-600 mt-2">
            Follow a balanced, nutrient-rich diet low in <br /> processed foods and refined sugars
          </p>
        </div>

        {/* Sleep Card */}
        <div className="bg-blue-100 rounded-lg shadow-lg p-6 flex flex-col items-center text-center">
          <div className="bg-blue-300 rounded-full h-20 w-20 mb-4 flex items-center justify-center">
            {/* Replace with an actual image/icon */}
            <span className="text-blue-800 text-4xl font-semibold">🧘🏻‍♀️</span>
          </div>
          <h2 className="text-xl font-semibold text-blue-800">Medications</h2>
          <p className="text-gray-600 mt-2">Progesterone therapy can be used if <br />birth control pills aren’t suitable.</p>
        </div>

        {/* Depression Card */}
        <div className="bg-yellow-100 rounded-lg shadow-lg p-6 flex flex-col items-center text-center">
          <div className="bg-yellow-300 rounded-full h-20 w-20 mb-4 flex items-center justify-center">
            {/* Replace with an actual image/icon */}
            <span className="text-yellow-800 text-4xl font-semibold">👩‍⚕️</span>
          </div>
          <h2 className="text-xl font-semibold text-yellow-800">Surgical Options</h2>
          <p className="text-gray-600 mt-2">Typically recommended when other treatments <br />have not been effective.</p>
        </div>

        {/* Stress Card */}
        <div className="bg-pink-100 rounded-lg shadow-lg p-6 flex flex-col items-center text-center">
          <div className="bg-pink-300 rounded-full h-20 w-20 mb-4 flex items-center justify-center">
            {/* Replace with an actual image/icon */}
            <span className="text-pink-800 text-4xl font-semibold">🙅‍♀️</span>
          </div>
          <h2 className="text-xl font-semibold text-pink-800">Stress</h2>
          <p className="text-gray-600 mt-2">
            Mindfulness practices like meditation and yoga.

          </p>
        </div>
      </div>
    </div>
  );
};

export default SelfAssessment;
