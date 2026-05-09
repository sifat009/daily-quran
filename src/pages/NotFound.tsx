import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";

const NotFound = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">
          {language === 'bn' ? 'দুঃখিত! এই পাতাটি খুঁজে পাওয়া যায়নি।' : 'Oops! Page not found.'}
        </p>
        <Button asChild>
          <Link to="/">
            {language === 'bn' ? 'হোম পেজে ফিরে যান' : 'Return to Home'}
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
