import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Phone, MessageCircle, Heart, ExternalLink, AlertCircle } from "lucide-react";

export function Resources() {
  const crisisResources = [
    {
      name: "National Suicide Prevention Lifeline",
      number: "988",
      description: "24/7 free and confidential support",
      icon: Phone,
    },
    {
      name: "Crisis Text Line",
      number: "Text HOME to 741741",
      description: "Free, 24/7 crisis support via text",
      icon: MessageCircle,
    },
    {
      name: "SAMHSA National Helpline",
      number: "1-800-662-4357",
      description: "Treatment referral and information service",
      icon: Phone,
    },
  ];

  const mentalHealthResources = [
    {
      name: "Psychology Today",
      description: "Find therapists in your area",
      url: "https://www.psychologytoday.com",
    },
    {
      name: "BetterHelp",
      description: "Online therapy platform",
      url: "https://www.betterhelp.com",
    },
    {
      name: "Talkspace",
      description: "Online therapy services",
      url: "https://www.talkspace.com",
    },
    {
      name: "NAMI",
      description: "National Alliance on Mental Illness - Education and support",
      url: "https://www.nami.org",
    },
  ];

  const selfCareApps = [
    {
      name: "Headspace",
      description: "Meditation and mindfulness",
    },
    {
      name: "Calm",
      description: "Sleep, meditation, and relaxation",
    },
    {
      name: "Moodfit",
      description: "Mental health tracking and exercises",
    },
    {
      name: "Sanvello",
      description: "Stress, anxiety, and depression support",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="mb-2">Mental Health Resources</h1>
          <p className="text-muted-foreground">You don't have to face this alone</p>
        </div>

        {/* Crisis Alert */}
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="mb-2 text-red-900">In Crisis?</h3>
                <p className="text-sm text-red-800 mb-4">
                  If you're thinking about suicide, are worried about a friend or loved one, or would like emotional support, the Lifeline network is available 24/7.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button className="bg-red-600 hover:bg-red-700">
                    <Phone className="mr-2 h-4 w-4" />
                    Call 988
                  </Button>
                  <Button variant="outline" className="border-red-300">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Text HOME to 741741
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Crisis Resources */}
        <Card className="bg-white/90 backdrop-blur">
          <CardHeader>
            <CardTitle>24/7 Crisis Support</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {crisisResources.map((resource, index) => {
                const Icon = resource.icon;
                return (
                  <div key={index} className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="mb-1">{resource.name}</h4>
                        <p className="text-muted-foreground mb-2">{resource.description}</p>
                        <p className="text-blue-600">{resource.number}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Professional Help */}
        <Card className="bg-white/90 backdrop-blur">
          <CardHeader>
            <CardTitle>Find Professional Help</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mentalHealthResources.map((resource, index) => (
                <div key={index} className="p-4 bg-purple-50 rounded-lg flex items-center justify-between">
                  <div>
                    <h4 className="mb-1">{resource.name}</h4>
                    <p className="text-sm text-muted-foreground">{resource.description}</p>
                  </div>
                  <Button size="sm" variant="ghost" asChild>
                    <a href={resource.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Self-Care Apps */}
        <Card className="bg-white/90 backdrop-blur">
          <CardHeader>
            <CardTitle>Recommended Apps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {selfCareApps.map((app, index) => (
                <div key={index} className="p-4 bg-green-50 rounded-lg">
                  <h4 className="mb-1">{app.name}</h4>
                  <p className="text-sm text-muted-foreground">{app.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Important Note */}
        <Card className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <Heart className="w-6 h-6 flex-shrink-0" />
              <div>
                <h3 className="mb-2">Remember</h3>
                <p className="text-sm opacity-90">
                  Seeking help is a sign of strength, not weakness. Mental health is just as important as physical health. 
                  These resources are here to support you on your journey to wellness.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <Card className="bg-white/90 backdrop-blur">
          <CardContent className="p-6">
            <p className="text-xs text-muted-foreground text-center">
              <strong>Disclaimer:</strong> This app is not a substitute for professional medical advice, diagnosis, or treatment. 
              Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
