"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { Textarea } from "../ui/textarea"
import { ArrowUp, X, Plus } from "lucide-react"

// Internal component for the Add Photos Dialog
interface AddPhotosDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

function AddPhotosDialog({ isOpen, onOpenChange }: AddPhotosDialogProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleAddClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      console.log("Selected files:", files)
      // Here you would typically handle the file upload, e.g., send to a server
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
     <DialogContent
        className="w-[480px] p-6 bg-white rounded-lg shadow-lg border-0"
        style={{ top: "170px", left: "65%", transform: "translateX(-50%)" }}
        >
        <DialogHeader className="flex flex-row items-center justify-between pb-4">
            <DialogTitle className="text-lg font-bold text-gray-800">Add Photos :</DialogTitle>
            <DialogClose asChild>
            <Button variant="ghost" size="icon" className="h-6 w-6">
                <X className="h-4 w-4 text-gray-500" />
            </Button>
            </DialogClose>
        </DialogHeader>
        <div className="flex flex-col items-start">
            {/* Solid square box */}
            <div
            className="w-24 h-24 ml-5 bg-white border border-gray-300 rounded-md flex items-center justify-center cursor-pointer"
            onClick={handleAddClick}
            title="Add Photo"
            >
            <Plus className="w-8 h-8 text-gray-400 pointer-events-none" />
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" multiple />
            </div>
            {/* Horizontal line */}
            <hr className="w-[calc(100%+3rem)] -mx-6 my-4 border-gray-300 border-t" />
            {/* Submit button bottom right */}
            <div className="w-full flex justify-end">
            <Button className="bg-[#00cd95] hover:bg-emerald-600 text-white font-semibold py-2 px-4 rounded-md cursor-pointer">
                Submit Feedback Photo
            </Button>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Internal component for the Write Feedback Dialog
interface WriteFeedbackDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

function WriteFeedbackDialog({ isOpen, onOpenChange }: WriteFeedbackDialogProps) {
    const [feedbackType, setFeedbackType] = useState<"suggestion" | "bug" | "other" | null>(null)
  const [isAddPhotosDialogOpen, setIsAddPhotosDialogOpen] = useState(false)

  const handleAddPhotoClick = () => {
    setIsAddPhotosDialogOpen(true)
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className="fixed bottom-[-90px] right-[-110px] w-[330px] h-[380px] p-4 bg-white rounded-lg shadow-lg border-0 flex flex-col z-[100]"
        style={{ left: "auto", top: "auto", margin: 0 }}
        >
          <DialogHeader className="flex flex-row items-center justify-between pb-2">
            <DialogTitle className="text-2xl ml-15 font-normal text-gray-800">Write Feedback</DialogTitle>
            <DialogClose asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <X className="h-4 w-4 text-gray-500" />
              </Button>
            </DialogClose>
          </DialogHeader>
          <div className="space-y-4 flex-1 flex flex-col">
            <Textarea
              placeholder="Say what you think about this app"
              className="min-h-[100px] text-black resize-none border-gray-300 focus-visible:ring-emerald-500"
            />
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>0 Uploaded</span>
              <Button variant="link" className="text-[#00cd95] p-0 h-auto cursor-pointer" onClick={handleAddPhotoClick}>
                Add Photo
              </Button>
            </div>
            <div className="flex gap-2 mb-[50px]">
                {["suggestion", "bug", "other"].map((type) => (
                    <Button
                    key={type}
                    className={`flex-1 mt-2 py-2 px-4 rounded-md text-sm font-semibold cursor-pointer ${
                        feedbackType === type
                        ? "bg-[#00cd95] text-white"
                        : "bg-[#f0f0f0] text-gray-800 hover:bg-gray-200"
                    }`}
                    onClick={() => setFeedbackType(type as any)}
                    >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                    </Button>
                ))}
            </div>
            <Button className="w-full bg-[#00cd95] hover:bg-emerald-600 text-white text-md font-semibold py-5 rounded-md cursor-pointer">
              Send Feedback
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <AddPhotosDialog isOpen={isAddPhotosDialogOpen} onOpenChange={setIsAddPhotosDialogOpen} />
    </>
  )
}

// Main Feedback component to be imported into HomePage
export default function Feedback() {
  const [isFeedbackDialogOpen, setIsFeedbackDialogOpen] = useState(false)

  return (
    <>
      {/* Feedback Button */}
      <Button
        className="fixed bottom-4 right-8 bg-[#00cd95] mr-5 hover:bg-emerald-600 text-white text-lg font-normal py-4 px-5 rounded-md shadow-lg flex items-center gap-3"
        onClick={() => setIsFeedbackDialogOpen(true)}
      >
        Feedback <ArrowUp className="w-4 h-4" />
      </Button>

      {/* Write Feedback Dialog */}
      <WriteFeedbackDialog isOpen={isFeedbackDialogOpen} onOpenChange={setIsFeedbackDialogOpen} />
    </>
  )
}
