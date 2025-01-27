"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  MessageSquarePlus,
  Tag,
  Clock,
  AlertCircle,
  CheckCircle2,
  Plus,
  Image as ImageIcon,
  Send,
} from "lucide-react";
 // Import date-fns for consistent date formatting
import issuesData from "../data/issues.json";
import commentsData from "../data/comments.json";
import { Issue, Comment } from "@/types";
import {default as deliveryStack} from "../../contentstackDeliveryConfig";
import { Navbar } from "@/components/navbar"; 
import { Footer } from "@/components/footer"; 
async function fetchNavbarAndFooterData() {
  try {
    const navbarData = await deliveryStack
      .contentType("llm_store_navbar")
      .entry("blt2d9312ce7631d045")
      .fetch();

    const footerData = await deliveryStack
      .contentType("llm_store_footer")
      .entry("bltde15764bad558ff4")
      .fetch();

    return { navbar: navbarData, footer: footerData };
  } catch (error) {
    console.error("Error fetching navbar and footer data:", error);
    throw error;
  }
}

export default function AskAndResolve() {
  const [issues, setIssues] = useState<Issue[]>(issuesData.issues);
  const [comments, setComments] = useState<Comment[]>(commentsData.comments);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [isNewIssueModalOpen, setIsNewIssueModalOpen] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [navbarData, setNavbarData] = useState<any>(null);
  const [footerData, setFooterData] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [newIssue, setNewIssue] = useState({
    title: "",
    description: "",
    labels: [] as string[],
    images: [] as string[],
  });

  useEffect(() => {
    async function loadNavbarAndFooter() {
      try {
        const { navbar, footer } = await fetchNavbarAndFooterData();
        setNavbarData(navbar);
        setFooterData(footer);
      } catch (error) {
        console.error("Failed to load navbar and footer data:", error);
      }
    }

    loadNavbarAndFooter();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const handleNewIssue = (e: React.FormEvent) => {
    e.preventDefault();
    const issue: Issue = {
      id: (issues.length + 1).toString(),
      ...newIssue,
      status: "open",
      createdAt: new Date().toISOString(),
      createdBy: "current.user",
    };
    setIssues([issue, ...issues]);
    setNewIssue({ title: "", description: "", labels: [], images: [] });
    setIsNewIssueModalOpen(false);
  };

  const handleNewComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedIssue || !newComment.trim()) return;

    const comment: Comment = {
      id: (comments.length + 1).toString(),
      issueId: selectedIssue.id,
      content: newComment,
      createdAt: new Date().toISOString(),
      createdBy: "current.user",
      images: [],
    };
    setComments([...comments, comment]);
    setNewComment("");
  };

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "issue" | "comment"
  ) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === "issue") {
          setNewIssue((prev) => ({
            ...prev,
            images: [...prev.images, reader.result as string],
          }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950">
      {/* Render Navbar */}
      {navbarData && <Navbar menuItems={navbarData.menu_links || []} />}

      <div className="max-w-7xl mx-auto px-4 py-8 flex-1">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <MessageSquarePlus className="w-8 h-8 text-purple-500" />
            <h1 className="text-3xl font-bold text-white">Ask & Resolve</h1>
          </div>
          <button
            onClick={() => setIsNewIssueModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Issue
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Issues List */}
          <div className="lg:col-span-1 space-y-4">
            {issues.map((issue) => (
              <div
                key={issue.id}
                onClick={() => setSelectedIssue(issue)}
                className={`p-4 rounded-lg cursor-pointer transition-colors ${
                  selectedIssue?.id === issue.id
                    ? "bg-zinc-900 border-2 border-purple-500"
                    : "bg-zinc-900/50 hover:bg-zinc-900"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-medium text-zinc-100">{issue.title}</h3>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      issue.status === "open"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-zinc-500/20 text-zinc-400"
                    }`}
                  >
                    {issue.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-zinc-400">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {formatDate(issue.createdAt)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Tag className="w-4 h-4" />
                    {issue.labels.length} labels
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Issue Details & Comments */}
          <div className="lg:col-span-2">
            {selectedIssue ? (
              <div className="bg-zinc-900 rounded-lg p-6">
                <div className="border-b border-zinc-800 pb-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-zinc-100">
                      {selectedIssue.title}
                    </h2>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        selectedIssue.status === "open"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-zinc-500/20 text-zinc-400"
                      }`}
                    >
                      {selectedIssue.status === "open" ? (
                        <div className="flex items-center gap-2">
                          <AlertCircle className="w-4 h-4" />
                          Open
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4" />
                          Closed
                        </div>
                      )}
                    </span>
                  </div>
                  <p className="text-zinc-300 mb-4">{selectedIssue.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedIssue.labels.map((label) => (
                      <span
                        key={label}
                        className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-sm"
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Comments */}
                <div className="space-y-6">
                  {comments
                    .filter((comment) => comment.issueId === selectedIssue.id)
                    .map((comment) => (
                      <div key={comment.id} className="bg-zinc-900/50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-purple-400">
                            {comment.createdBy}
                          </span>
                          <span className="text-sm text-zinc-400">
                            {formatDate(comment.createdAt)}
                          </span>
                        </div>
                        <p className="text-zinc-300">{comment.content}</p>
                      </div>
                    ))}

                  {/* New Comment Form */}
                  <form onSubmit={handleNewComment} className="mt-6">
                    <div className="flex items-start gap-4">
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment..."
                        className="flex-1 bg-zinc-800 border-zinc-700 rounded-lg p-3 text-white placeholder-zinc-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        rows={3}
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              <div className="bg-zinc-900/50 rounded-lg p-8 text-center">
                <MessageSquarePlus className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-zinc-400">Select an issue to view details</h3>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* New Issue Modal */}
      {isNewIssueModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-zinc-900 rounded-xl p-6 w-full max-w-2xl">
            <h2 className="text-2xl font-bold text-white mb-6">Create New Issue</h2>
            <form onSubmit={handleNewIssue} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Title</label>
                <input
                  type="text"
                  value={newIssue.title}
                  onChange={(e) => setNewIssue({ ...newIssue, title: e.target.value })}
                  className="w-full bg-zinc-800 border-zinc-700 rounded-lg p-2 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Description</label>
                <textarea
                  value={newIssue.description}
                  onChange={(e) => setNewIssue({ ...newIssue, description: e.target.value })}
                  className="w-full bg-zinc-800 border-zinc-700 rounded-lg p-2 text-white"
                  rows={4}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Labels (comma-separated)</label>
                <input
                  type="text"
                  value={newIssue.labels.join(", ")}
                  onChange={(e) =>
                    setNewIssue({ ...newIssue, labels: e.target.value.split(",").map((l) => l.trim()) })
                  }
                  className="w-full bg-zinc-800 border-zinc-700 rounded-lg p-2 text-white"
                  placeholder="bug, feature, documentation"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Images</label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2 px-4 py-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors"
                  >
                    <ImageIcon className="w-4 h-4" />
                    Add Images
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => handleImageUpload(e, "issue")}
                  />
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {newIssue.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Upload preview ${index + 1}`}
                      className="w-20 h-20 object-cover rounded"
                    />
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setIsNewIssueModalOpen(false)}
                  className="px-4 py-2 text-zinc-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Create Issue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Render Footer */}
      {footerData && (
        <Footer
          links={footerData.links || []}
          social_links={footerData.social_links || []}
          copyright={footerData.copyright || ""}
        />
      )}
    </div>
  );
}
