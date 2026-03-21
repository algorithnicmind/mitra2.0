import { useAuth } from '../context/AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';

const Home = () => {
  const { user } = useAuth();
  const userName = user?.name?.split(' ')[0] || user?.anonymousAlias || 'Student';

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <section className="bg-indigo-600 rounded-2xl p-8 text-white shadow-md">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {userName}! 👋</h1>
        <p className="text-indigo-100 text-lg max-w-2xl">
          Your mental wellness journey continues here. Check your daily insights, chat with your AI companion, or book a session with a counsellor.
        </p>
      </section>

      {/* Quick Actions */}
      <section className="grid md:grid-cols-3 gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4 text-2xl">
              💬
            </div>
            <CardTitle className="text-xl">AI Support Chat</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-6">Talk to your non-judgmental AI companion whenever you feel stressed or anxious.</p>
            <Link to="/chat">
              <Button className="w-full">Start Chatting</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-4 text-2xl">
              📋
            </div>
            <CardTitle className="text-xl">Mental Health Check</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-6">Take a quick clinical screening to track your mental wellbeing over time.</p>
            <Link to="/screening">
              <Button variant="outline" className="w-full">Take Screening</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-4 text-2xl">
              📅
            </div>
            <CardTitle className="text-xl">Book a Session</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-6">Schedule a confidential 1-on-1 session with a campus counsellor.</p>
            <Link to="/book">
              <Button variant="secondary" className="w-full">Find Counsellor</Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Mood Tracker Placeholder */}
      <section className="mt-12 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">How are you feeling today?</h2>
        <Card>
          <CardContent className="p-8 text-center text-gray-500">
            <p className="mb-4">Log your daily mood to visualize patterns in your wellbeing.</p>
            <Button variant="outline">+ Log Mood Entry</Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Home;
