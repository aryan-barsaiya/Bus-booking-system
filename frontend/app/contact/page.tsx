import Head from 'next/head';

const Contact = () => {
  return (
    <div>
      <Head>
        <title>Contact Us</title>
      </Head>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-200 sm:text-4xl">
              Get in touch
            </h2>
            <p className="mt-3 max-w-3xl text-lg text-gray-400">
              Fill out the form below to send us a message and we will get back to you as soon as possible.
            </p>
            <div className="mt-8 sm:mt-12">
              <form action="#" method="POST">
                <div className="sm:flex">
                  <div className="mb-4 sm:mr-4 sm:mb-0">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-500">
                      Name
                    </label>
                    <div className="mt-1">
                      <input type="text" name="name" id="name" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                    </div>
                  </div>
                  <div className="mb-4 sm:ml-4 sm:mb-0">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-500">
                      Email
                    </label>
                    <div className="mt-1">
                      <input type="email" name="email" id="email" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-500">
                    Message
                  </label>
                  <div className="mt-1">
                    <textarea id="message" name="message" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"></textarea>
                  </div>
                </div>
                <div className="mt-4">
                  <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="mt-10 lg:mt-0">
            <h2 className="text-3xl font-extrabold text-gray-200 sm:text-4xl">
              Our office
            </h2>
            <div className="mt-4 text-lg text-gray-400">
              <p>123 Main St.</p>
              <p>Suite 100</p>
              <p>Anytown, USA 12345</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
