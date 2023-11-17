import React, { useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "react-query";

export const Caption = () => {
  const [imageUrl, setImageUrl] = useState("");

  const captionMutation = useMutation(async (formData) => {
    const response = await fetch("/api/caption", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data;
  });

  const handleCaptionGeneration = async () => {
    try {
      // Call the mutation with your form data
      await captionMutation.mutateAsync({
        imageUrl: imageUrl,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageChange = (e) => {
    const value = e.currentTarget.value;
    setImageUrl(value);
  };

  let isCaptionLoading = captionMutation.isLoading;
  let generatedCaption = captionMutation.isSuccess && captionMutation.data;

  return (
    <main className="w-full p-4 py-20">
      <section className="text-center pb-10 flex justify-center flex-col items-center">
        <h1 className="text-2xl md:text-5xl font-semibold mb-4">
          Generate Captions with AI
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Our AI generates captions for your content in seconds!
        </p>
      </section>
      <div className="max-w-md mx-auto space-y-4">
        <div className="space-y-2">
          <Label htmlFor="image-upload">Image URL</Label>
          <Input
            type="text"
            id="image-upload"
            value={imageUrl}
            onChange={handleImageChange}
          />
        </div>

        <div className="relative space-y-2">
          <Label htmlFor="caption">Generated Caption</Label>
          <Textarea
            className="w-full h-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            id="caption"
            disabled
            value={generatedCaption ? generatedCaption : ""}
          />
        </div>
        <Button
          className="w-full"
          onClick={handleCaptionGeneration}
          disabled={isCaptionLoading}
        >
          {isCaptionLoading ? <ReloadIcon /> : null}
          Generate Caption
        </Button>
      </div>
    </main>
  );
};
