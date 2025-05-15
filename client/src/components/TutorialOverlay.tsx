import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, ArrowRight, HelpCircle } from "lucide-react";

interface TutorialStep {
  title: string;
  content: string;
  target?: string; // CSS selector to highlight
}

interface TutorialOverlayProps {
  showHelpButton?: boolean;
}

export default function TutorialOverlay({ showHelpButton = true }: TutorialOverlayProps) {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [hasSeenTutorial, setHasSeenTutorial] = useState(false);

  const tutorialSteps: TutorialStep[] = [
    {
      title: "Welcome to Wingy Coin!",
      content: "This quick tutorial will help you get familiar with the dashboard. Let's get started!"
    },
    {
      title: "Navigation Menu",
      content: "Use the sidebar to navigate between different sections of the application.",
      target: ".sidebar-nav"
    },
    {
      title: "User Statistics",
      content: "Check your user statistics and monitor growth over time.",
      target: ".user-statistics"
    },
    {
      title: "Level Statistics",
      content: "View detailed level statistics and filter by different time periods.",
      target: ".level-statistics"
    },
    {
      title: "All Set!",
      content: "You're all set to start using Wingy Coin. Enjoy exploring the dashboard!"
    }
  ];

  useEffect(() => {
    // Check if user has seen the tutorial before
    const tutorialSeen = localStorage.getItem('tutorial_seen');
    
    if (!tutorialSeen) {
      // Only show tutorial for new users
      setOpen(true);
      setHasSeenTutorial(false);
    } else {
      setHasSeenTutorial(true);
    }
  }, []);

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    // Mark tutorial as seen
    localStorage.setItem('tutorial_seen', 'true');
    setHasSeenTutorial(true);
    setOpen(false);
  };

  // Highlight element based on target selector
  useEffect(() => {
    const target = tutorialSteps[currentStep]?.target;
    
    // Remove any existing highlights
    document.querySelectorAll('.tutorial-highlight').forEach(el => {
      el.classList.remove('tutorial-highlight');
    });
    
    if (target) {
      const element = document.querySelector(target);
      if (element) {
        element.classList.add('tutorial-highlight');
        // Scroll to element if needed
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
    
    // Cleanup when component unmounts
    return () => {
      document.querySelectorAll('.tutorial-highlight').forEach(el => {
        el.classList.remove('tutorial-highlight');
      });
    };
  }, [currentStep, open]);

  // Function to restart tutorial
  const restartTutorial = () => {
    setCurrentStep(0);
    setOpen(true);
    setHasSeenTutorial(false);
    localStorage.removeItem('tutorial_seen');
  };

  // If user has seen tutorial and help button is not shown, return null
  if (hasSeenTutorial && !showHelpButton) {
    return null;
  }
  
  // If user has seen tutorial but we want to show the help button
  if (hasSeenTutorial && showHelpButton) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button 
          className="rounded-full w-12 h-12 bg-primary text-white shadow-md hover:shadow-lg"
          onClick={restartTutorial}
        >
          <HelpCircle className="h-6 w-6" />
          <span className="sr-only">Help</span>
        </Button>
      </div>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">{tutorialSteps[currentStep]?.title}</DialogTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-4 top-4" 
            onClick={handleClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <div className="p-4 mb-4">
          <p className="text-neutral-700">{tutorialSteps[currentStep]?.content}</p>
        </div>
        
        <DialogFooter className="flex sm:justify-between">
          <div className="flex items-center gap-1">
            {[...Array(tutorialSteps.length)].map((_, index) => (
              <span 
                key={index}
                className={`h-2 w-2 rounded-full transition-all ${
                  index === currentStep 
                    ? "bg-primary w-4" 
                    : "bg-neutral-300"
                }`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            {currentStep > 0 && (
              <Button 
                variant="outline" 
                onClick={handlePrevious}
              >
                Previous
              </Button>
            )}
            <Button 
              onClick={handleNext}
              className="gap-2"
            >
              {currentStep < tutorialSteps.length - 1 ? (
                <>
                  Next
                  <ArrowRight className="h-4 w-4" />
                </>
              ) : 'Finish'}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}