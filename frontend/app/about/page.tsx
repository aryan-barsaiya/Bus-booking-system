import Head from "next/head";
import Image from "next/image";

const AboutUs = () => {
  const companyInfo = {
    logoUrl: "/logo.jpg",
    title: "Our Mission",
    description:
      "To simplify travel planning and make it more accessible for everyone.",
    values: ["Reliability", "Convenience", "Affordable pricing"],
  };

  const teamMembers = [
    {
      imageSrc: "/team_member_1.jpg",
      name: "Aryan Barsaiya",
      position: "CEO & Founder",
      bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium ...",
    },
    {
      imageSrc: "/team_member_2.jpg",
      name: "Raman Sain",
      position: "CTO",
      bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium ...",
    },
  ];

  return (
    <div>
      <Head>
        <title>About Us | Bus Booking System</title>
      </Head>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          <div className="pt-8 lg:pt-0">
            <h2 className="text-3xl font-extrabold text-gray-200 sm:text-4xl">
              {companyInfo.title}
            </h2>
            <p className="mt-3 max-w-2xl text-lg text-gray-400">
              {companyInfo.description}
            </p>
            <dl className="mt-8 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              {companyInfo.values.map((value) => (
                <dt key={value} className="text-base font-medium text-gray-400">
                  • {value}
                </dt>
              ))}
            </dl>
          </div>
          <Image
            src={companyInfo.logoUrl}
            alt="Company Logo"
            className="rounded-lg h-96 object-cover lg:col-span-1"
            width={500}
            height={300}
          />
        </div>
        <hr className="my-8" />
        <div className="space-y-12">
          <h2 className="text-3xl font-extrabold text-gray-200 sm:text-4xl">
            Meet our Team
          </h2>
          <div className="-m-4 -mx-4 md:-m-8 md:-mx-8 lg:-m-12 lg:-mx-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {teamMembers.map((member) => (
                <div
                  key={member.name}
                  className="relative overflow-hidden rounded-lg aspect-video group"
                >
                  <Image
                    src={member.imageSrc}
                    alt={member.name}
                    className="object-cover transition duration-500 ease-in-out transform group-hover:scale-110"
                    width={500}
                    height={1000}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out">
                    <div className="p-4">
                      <h3 className="text-white text-lg font-semibold mb-1">
                        {member.name}
                      </h3>
                      <p className="text-slate-300 text-xs">
                        {member.position}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
