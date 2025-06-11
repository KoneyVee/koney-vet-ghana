import { useEffect, ReactNode } from "react";
import { useLocation, Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/button";
import CtaSection from "@/components/home/CtaSection";
import { services } from "@/data/services";
import { motion } from "framer-motion";
import { AnimatedElement } from "@/components/ui/AnimatedElement";
import { ArrowRight, Phone, Calendar } from "lucide-react";

// Services are imported from data/services.ts

const Services = () => {
  const location = useLocation();

  useEffect(() => {
    // Handle hash links for jumping to specific service sections
    if (location.hash) {
      const id = location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        // Add a small delay to ensure the page is fully loaded
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <MainLayout>
      <PageHeader
        title="Our Services"
        description="Comprehensive veterinary care for your beloved pets"
        bgImage="https://res.cloudinary.com/dzmvzdcpx/image/upload/v1748526044/_MG_2122_svr52z.jpg"
        breadcrumbs={[{ label: "Services", path: "/services" }]}
      />

      {/* Emergency Call Section */}
      <section className="py-12 bg-vet-coral/10">
        <div className="container-custom">
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-4 bg-vet-coral p-8 text-white flex items-center">
                <AnimatedElement variant="slideRight">
                  <div className="space-y-6">
                    <h3 className="text-2xl md:text-3xl font-display font-bold">
                      Emergency Cases
                    </h3>
                    <p className="opacity-90">
                      Please feel free to contact our friendly reception staff
                      with any urgent medical enquiry.
                    </p>
                    <div className="flex items-center gap-3 pt-2">
                      <div className="bg-white/20 p-2 rounded-full">
                        <Phone className="h-5 w-5" />
                      </div>
                      <a
                        href="tel:+233533734385"
                        className="text-xl font-bold hover:underline"
                      >
                        053 373 4385
                      </a>
                    </div>
                  </div>
                </AnimatedElement>
              </div>

              <div className="lg:col-span-8 p-8 lg:p-12">
                <AnimatedElement variant="slideUp">
                  <div className="flex flex-col md:flex-row md:items-center gap-8 justify-between">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-display font-bold text-vet-dark mb-3">
                        Book an Appointment
                      </h3>
                      <p className="text-gray-600">
                        Schedule a visit with our veterinary specialists for
                        your pet's needs.
                      </p>
                    </div>
                    <Link to="tel:+233533734385">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button className="bg-vet-teal hover:bg-vet-blue text-white rounded-full px-6 py-6 flex items-center gap-2">
                          <Phone className="h-5 w-5" />
                          <span className="text-lg">Call Us</span>
                        </Button>
                      </motion.div>
                    </Link>
                  </div>
                </AnimatedElement>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <AnimatedElement variant="fadeIn">
              <div className="mb-4 flex justify-center">
                <span className="bg-vet-teal/10 text-vet-teal px-4 py-1 rounded-full text-sm font-medium inline-block">
                  Professional Pet Care
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-vet-dark">
                Services <span className="text-vet-teal">We Offer</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We provide comprehensive veterinary services to keep your pets
                healthy and happy throughout their lives.
              </p>
            </AnimatedElement>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
            {services.map((service, index) => (
              <div key={service.id}>
                <AnimatedElement variant="fadeIn" delay={0.1 * index}>
                  <div id={service.id}>
                    <motion.div
                      whileHover={{
                        y: -5,
                        boxShadow:
                          "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                      }}
                      className="bg-white p-6 rounded-lg shadow-md transition-custom border border-gray-100 h-full relative overflow-hidden group"
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-vet-teal/5 rounded-bl-full z-0"></div>

                      <div className="relative z-10">
                        <div className="flex items-start gap-6 mb-6">
                          <div className="bg-vet-teal/10 p-4 rounded-full shrink-0">
                            <service.icon className="h-8 w-8 text-vet-teal" />
                          </div>

                          <div>
                            <h3 className="text-xl md:text-2xl font-display font-bold text-vet-dark mb-2 group-hover:text-vet-teal transition-colors">
                              {service.title}
                            </h3>

                            {service.pricing && (
                              <div className="inline-block bg-vet-coral/10 px-3 py-1 rounded-full text-sm font-medium text-vet-coral mb-3">
                                {service.pricing}
                              </div>
                            )}
                          </div>
                        </div>

                        <p className="text-gray-700 mb-6">
                          {service.description}
                        </p>

                        <div className="pt-4 border-t border-gray-100">
                          <Link to={`/services/${service.id}`}>
                            <motion.div
                              whileHover={{ x: 5 }}
                              className="flex items-center gap-2 text-vet-blue hover:text-vet-teal transition-colors"
                            >
                              <span className="font-medium">View Details</span>
                              <ArrowRight className="h-4 w-4" />
                            </motion.div>
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </AnimatedElement>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <AnimatedElement variant="fadeIn" delay={0.5}>
              <Link to="tel:+233533734385">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button className="bg-vet-blue hover:bg-vet-teal text-white rounded-full px-8 py-6 text-lg">
                    Call Us Now
                  </Button>
                </motion.div>
              </Link>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Service Process Section */}
      <section className="py-20 bg-vet-light">
        <div className="container-custom">
          <div className="text-center mb-12">
            <AnimatedElement variant="fadeIn">
              <div className="mb-4 flex justify-center">
                <span className="bg-vet-teal/10 text-vet-teal px-4 py-1 rounded-full text-sm font-medium inline-block">
                  Our Process
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-vet-dark">
                How We <span className="text-vet-teal">Provide Care</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our veterinary care process is designed to provide the best
                possible experience for both you and your pet.
              </p>
            </AnimatedElement>
          </div>

          <div className="relative mt-20">
            {/* Process Timeline */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-vet-teal/20 transform -translate-x-1/2 hidden md:block"></div>

            <div className="space-y-24">
              <AnimatedElement variant="fadeIn" delay={0.1}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                  <div className="md:text-right">
                    <div className="bg-vet-teal/10 p-2 rounded-full w-12 h-12 flex items-center justify-center mb-4 md:ml-auto">
                      <span className="text-xl font-bold text-vet-teal">1</span>
                    </div>
                    <h3 className="text-xl font-semibold text-vet-dark mb-3">
                      Initial Consultation
                    </h3>
                    <p className="text-gray-600">
                      We begin with a thorough examination of your pet and
                      discussion of their health history, current concerns, and
                      your goals for their care.
                    </p>
                  </div>

                  <div className="hidden md:block"></div>

                  {/* Timeline Node */}
                  <div className="absolute left-1/2 top-0 transform -translate-x-1/2 hidden md:block">
                    <div className="w-6 h-6 rounded-full bg-vet-teal shadow-lg"></div>
                  </div>
                </div>
              </AnimatedElement>

              <AnimatedElement variant="fadeIn" delay={0.2}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                  <div className="hidden md:block"></div>

                  <div>
                    <div className="bg-vet-teal/10 p-2 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                      <span className="text-xl font-bold text-vet-teal">2</span>
                    </div>
                    <h3 className="text-xl font-semibold text-vet-dark mb-3">
                      Diagnostic Testing
                    </h3>
                    <p className="text-gray-600">
                      If needed, we perform diagnostic tests to identify any
                      underlying issues. This may include blood work, imaging,
                      or other specialized tests.
                    </p>
                  </div>

                  {/* Timeline Node */}
                  <div className="absolute left-1/2 top-0 transform -translate-x-1/2 hidden md:block">
                    <div className="w-6 h-6 rounded-full bg-vet-teal shadow-lg"></div>
                  </div>
                </div>
              </AnimatedElement>

              <AnimatedElement variant="fadeIn" delay={0.3}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                  <div className="md:text-right">
                    <div className="bg-vet-teal/10 p-2 rounded-full w-12 h-12 flex items-center justify-center mb-4 md:ml-auto">
                      <span className="text-xl font-bold text-vet-teal">3</span>
                    </div>
                    <h3 className="text-xl font-semibold text-vet-dark mb-3">
                      Treatment Plan
                    </h3>
                    <p className="text-gray-600">
                      Based on our findings, we develop a customized treatment
                      plan for your pet. We explain all options and work with
                      you to make the best decisions for their care.
                    </p>
                  </div>

                  <div className="hidden md:block"></div>

                  {/* Timeline Node */}
                  <div className="absolute left-1/2 top-0 transform -translate-x-1/2 hidden md:block">
                    <div className="w-6 h-6 rounded-full bg-vet-teal shadow-lg"></div>
                  </div>
                </div>
              </AnimatedElement>

              <AnimatedElement variant="fadeIn" delay={0.4}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                  <div className="hidden md:block"></div>

                  <div>
                    <div className="bg-vet-teal/10 p-2 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                      <span className="text-xl font-bold text-vet-teal">4</span>
                    </div>
                    <h3 className="text-xl font-semibold text-vet-dark mb-3">
                      Follow-Up Care
                    </h3>
                    <p className="text-gray-600">
                      We provide ongoing support and follow-up care to ensure
                      your pet's recovery and long-term health. This includes
                      check-ups, medication adjustments, and preventative care.
                    </p>
                  </div>

                  {/* Timeline Node */}
                  <div className="absolute left-1/2 top-0 transform -translate-x-1/2 hidden md:block">
                    <div className="w-6 h-6 rounded-full bg-vet-teal shadow-lg"></div>
                  </div>
                </div>
              </AnimatedElement>
            </div>
          </div>
        </div>
      </section>

      <CtaSection />
    </MainLayout>
  );
};

export default Services;
