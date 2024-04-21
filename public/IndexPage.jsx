const IndexPage = () => {
  return (
    <html lang='en'>
      <head>
        <title>Send Mail</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <script src="https://unpkg.com/htmx.org@1.9.11" integrity="sha384-0gxUXCCR8yv9FM2b+U3FDbsKthCI66oH5IA9fHppQq9DDMHuMauqq1ZHBpJxQ0J0" crossorigin="anonymous"></script>
      </head>
      <style>
        {`
          .background-image {
            background-image: url('https://bnetcmsus-a.akamaihd.net/cms/content_entry_media/XRXVEO0S585Y1670826120823.png');
            background-size: cover;
            background-position: center;
          }
        `}
      </style>
      <body class="flex items-center justify-center h-screen background-image">
        <div id="formContainer" class="max-w-lg mx-auto p-8 bg-white bg-opacity-80 rounded shadow-lg">
          <h1 class="text-3xl font-bold underline mb-6 text-center">Send Item</h1>
          <div id="responseMessage" class="text-center py-4"></div>
          <form hx-post="/send" hx-target="#responseMessage" hx-swap="innerHTML" hx-boost="true" id="mailForm">
            <div class="mb-4">
              <label for="character" class="block text-sm font-medium text-gray-700">Characte Name:</label>
              <input type="text" id="character" name="character" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
            </div>
            <div class="mb-4">
              <label for="id" class="block text-sm font-medium text-gray-700">Item ID:</label>
              <input type="number" id="id" name="id" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
            </div>
            <div class="mb-6">
              <label for="quantity" class="block text-sm font-medium text-gray-700">Quantity:</label>
              <input type="number" id="quantity" name="quantity" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
            </div>
            <button type="submit" class="w-full bg-blue-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Send
            </button>
          </form>
        </div>
      </body>
    </html>
  );
};

export default IndexPage;