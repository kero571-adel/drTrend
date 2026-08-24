"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { addComment, getProductComments } from "@/lib/comments";
import type { Comment } from "@/types";

export default function Comments({ productId }: { productId: string }) {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let active = true;
    getProductComments(productId)
      .then((data) => {
        if (active) setComments(data);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      showToast("Please login to add a comment", "error");
      return;
    }
    if (!text.trim()) {
      showToast("Please write a comment", "error");
      return;
    }

    setSubmitting(true);
    try {
      await addComment({
        productId,
        userId: user.uid,
        userName: user.email || "Anonymous",
        rating,
        text: text.trim(),
      });

      // إضافة محلية فورية بدل ما تنتظر re-fetch
      setComments((prev) => [
        {
          id: Math.random().toString(36).slice(2),
          productId,
          userId: user.uid,
          userName: user.email || "Anonymous",
          rating,
          text: text.trim(),
          createdAt: new Date().toISOString(),
        },
        ...prev,
      ]);

      setText("");
      setRating(5);
      showToast("Comment added successfully!", "success");
    } catch {
      showToast("Something went wrong. Please try again.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-10 pt-8 border-t border-gray-100">
      <h2 className="font-heading font-bold text-xl mb-5">
        Reviews {comments.length > 0 && `(${comments.length})`}
      </h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-8"
      >
        <div className="flex items-center gap-1 mb-3">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setRating(n)}
              className={`text-2xl leading-none transition-colors ${
                n <= rating ? "text-yellow-400" : "text-gray-300"
              }`}
              aria-label={`${n} stars`}
            >
              ★
            </button>
          ))}
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          placeholder={
            user ? "Share your thoughts about this product..." : "Login to write a review"
          }
          disabled={!user}
          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        />

        <button
          type="submit"
          disabled={submitting || !user}
          className="mt-3 px-6 py-2.5 bg-primary hover:bg-primary-dark disabled:opacity-60 text-white font-semibold text-sm rounded-full transition-colors"
        >
          {submitting ? "Posting..." : "Post Review"}
        </button>
      </form>

      {/* List */}
      {loading ? (
        <p className="text-sm text-gray-500">Loading reviews...</p>
      ) : comments.length === 0 ? (
        <p className="text-sm text-gray-500">
          No reviews yet. Be the first to review this product!
        </p>
      ) : (
        <div className="space-y-5">
          {comments.map((c) => (
            <div key={c.id} className="border-b border-gray-100 pb-5">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-semibold text-gray-900">
                  {c.userName}
                </span>
                <span className="text-xs text-gray-400">
                  {new Date(c.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-0.5 mb-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <span
                    key={n}
                    className={`text-sm ${
                      n <= c.rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{c.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}