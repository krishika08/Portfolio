"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BaseLink } from "@/components/ui/BaseLink";
import { Icon, type IconName } from "@/components/ui/Icon";
import { destinations, sectionIds } from "@/config/navigation";
import type { CommunitySectionData, ImageAsset, Profile } from "@/types/content";
import styles from "./Community.module.css";

interface CommunityClientProps {
  data: CommunitySectionData;
  profile: Profile;
}

export function CommunityClient({ data, profile }: CommunityClientProps) {
  const nextDest = destinations[destinations.findIndex((d) => d.id === sectionIds.community) + 1];
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);
  const [lightboxPhoto, setLightboxPhoto] = useState<ImageAsset | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const event2025 = data.events.find((e) => e.id === "aws-community-day-2025") ?? data.events[0]!;
  const event2026 = data.events.find((e) => e.id === "aws-community-day-2026") ?? data.events[1]!;

  const photos = event2025.photos ?? [];

  // Esc key listener for modal
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && lightboxPhoto) {
        setLightboxPhoto(null);
      }
    }
    if (lightboxPhoto) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      closeButtonRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxPhoto]);

  return (
    <div className="relative" id="community-hub">
      {/* ── 1. Hero Band ────────────────────────────────────────────── */}
      <div className={styles.heroBand}>
        <div className={styles.heroContent}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowNumber}>08</span>
            <span className={styles.eyebrowSlash}>/</span>
            <span className={styles.eyebrowText}>COMMUNITY &amp; EVENTS</span>
          </div>

          <div className={styles.titleWrapper}>
            <h2 id="community-title" className={styles.title}>
              {data.title.lead}
              <br />
              <span className={styles.mintText}>{data.title.emphasis}</span>
            </h2>

            {/* Handwritten annotation matching design reference */}
            <div className={styles.handwrittenAnnotation} aria-hidden="true">
              <span>{data.handwrittenAnnotation.split(" ").slice(0, 2).join(" ")}</span>
              <span>{data.handwrittenAnnotation.split(" ").slice(2).join(" ")}</span>
              <svg className={styles.arrowSvg} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M8 8 C16 14, 20 22, 24 24 M24 24 L18 24 M24 24 L24 18" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          <p className={styles.description}>{data.subtitle}</p>

          <div className={styles.tagline} aria-hidden="true">
            <span>{data.tagline}</span>
          </div>
        </div>

        {/* Hero stage visual showing conference auditorium */}
        <div className={styles.heroWindow} aria-hidden="true">
          <Image
            src={data.heroImage.src}
            alt={data.heroImage.alt}
            width={data.heroImage.width}
            height={data.heroImage.height}
            className={styles.heroImage}
            priority={false}
          />
          <div className={styles.heroBadge}>
            <Icon name="cloud" className="size-3.5 text-accent" />
            <span>AWS Community · Dehradun</span>
          </div>
        </div>
      </div>

      {/* ── 2. Events Grid ──────────────────────────────────────────── */}
      <div className={styles.eventsGrid}>
        {/* ── Event 01: AWS Community Day 2025 (Attended, Real Photos) ── */}
        <article className={styles.card} aria-labelledby="event-2025-title">
          <div className={styles.cardTop}>
            <span className={`${styles.statusPill} ${styles.statusAttended}`}>
              <span className={styles.statusDot} aria-hidden="true" />
              <span>{event2025.statusLabel}</span>
            </span>

            <span className="font-mono text-xs text-muted">01 / 02</span>
          </div>

          <h3 id="event-2025-title" className={styles.cardTitle}>
            {event2025.title}
          </h3>

          <div className={styles.cardMeta}>
            <span className={styles.metaItem}>
              <Icon name="cloud" className="size-3.5 text-accent" />
              <span>{event2025.category}</span>
            </span>
            <span className={styles.metaSeparator} aria-hidden="true">|</span>
            <span className={styles.metaItem}>
              <Icon name="calendar" className="size-3.5" />
              <span>{event2025.year}</span>
            </span>
            {event2025.location && (
              <>
                <span className={styles.metaSeparator} aria-hidden="true">|</span>
                <span className={styles.metaItem}>
                  <Icon name="map-pin" className="size-3.5" />
                  <span>{event2025.location}</span>
                </span>
              </>
            )}
          </div>

          <p className={styles.cardDescription}>{event2025.description}</p>

          {/* Genuine Photographic Gallery (Images B & C) */}
          <div className={styles.galleryWrapper}>
            <div className={styles.photosRow} role="region" aria-label="AWS Community Day 2025 genuine photographs">
              {photos.map((photo, index) => (
                <div
                  key={photo.src}
                  className={styles.photoFrame}
                  onClick={() => setLightboxPhoto(photo)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setLightboxPhoto(photo);
                    }
                  }}
                  aria-label={`Enlarge photograph ${index + 1}: ${photo.alt}`}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    className={styles.galleryPhoto}
                  />
                  <div className={styles.photoHoverOverlay} aria-hidden="true">
                    <Icon name="maximize" className="size-4" />
                    <span>View Photo</span>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.galleryControls}>
              <span className={styles.galleryCaption}>
                Genuine attendee photographs · Dehradun, 2025
              </span>

              <div className={styles.galleryNavBtns}>
                <button
                  type="button"
                  className={styles.galleryNavBtn}
                  onClick={() => {
                    const next = (activePhotoIndex - 1 + photos.length) % photos.length;
                    setActivePhotoIndex(next);
                    if (photos[next]) setLightboxPhoto(photos[next]);
                  }}
                  aria-label="Previous photograph"
                >
                  <Icon name="arrow-left" className="size-3" />
                </button>
                <button
                  type="button"
                  className={styles.galleryNavBtn}
                  onClick={() => {
                    const next = (activePhotoIndex + 1) % photos.length;
                    setActivePhotoIndex(next);
                    if (photos[next]) setLightboxPhoto(photos[next]);
                  }}
                  aria-label="Next photograph"
                >
                  <Icon name="arrow-right" className="size-3" />
                </button>
              </div>
            </div>

            {/* Optional LinkedIn post or Learning anchor action */}
            {event2025.linkedInPostUrl ? (
              <a
                href={event2025.linkedInPostUrl}
                target="_blank"
                rel="noreferrer noopener"
                className={styles.actionBtn}
              >
                <span>View My LinkedIn Post</span>
                <Icon name="arrow-up-right" className="size-4" />
              </a>
            ) : profile.social.linkedin ? (
              <BaseLink href="#community-learnings" className={styles.actionBtn}>
                <span>Learning Reflection</span>
                <Icon name="arrow-down" className="size-4" />
              </BaseLink>
            ) : null}
          </div>
        </article>

        {/* ── Event 02: AWS Community Day 2026 (Upcoming, Anticipatory) ── */}
        <article className={`${styles.card} ${styles.card2026}`} aria-labelledby="event-2026-title">
          <div className={styles.cardTop}>
            <span className={`${styles.statusPill} ${styles.statusUpcoming}`}>
              <Icon name="calendar" className="size-3" />
              <span>{event2026.statusLabel}</span>
            </span>

            <span className="font-mono text-xs text-muted">02 / 02</span>
          </div>

          <h3 id="event-2026-title" className={styles.cardTitle}>
            {event2026.title}
          </h3>

          <div className={styles.cardMeta}>
            <span className={styles.metaItem}>
              <Icon name="cloud" className="size-3.5 text-accent" />
              <span>{event2026.category}</span>
            </span>
            <span className={styles.metaSeparator} aria-hidden="true">|</span>
            <span className={styles.metaItem}>
              <Icon name="calendar" className="size-3.5" />
              <span>{event2026.year}</span>
            </span>
          </div>

          <p className={styles.cardDescription}>{event2026.description}</p>

          {/* Anticipatory Visual Representation */}
          {event2026.visualImage && (
            <div className={styles.stagePreviewWrapper}>
              <Image
                src={event2026.visualImage.src}
                alt={event2026.visualImage.alt}
                width={event2026.visualImage.width}
                height={event2026.visualImage.height}
                className={styles.stagePreviewImg}
              />
              <div className={styles.stagePreviewOverlay}>
                <span>AWS Community Day 2026</span>
                <span className="font-mono text-accent">Planned Attendance</span>
              </div>
            </div>
          )}

          <div className="mt-auto">
            <BaseLink href={event2026.actionHref ?? "#contact"} className={styles.actionBtn}>
              <span>{event2026.actionText ?? "Excited for 2026!"}</span>
              <Icon name="arrow-right" className="size-4" />
            </BaseLink>
          </div>
        </article>
      </div>

      {/* ── 3. Bottom Strip: Key Learnings ──────────────────────────── */}
      <div className={styles.bottomStrip} id="community-learnings">
        <div className={styles.learningsHeader}>
          <div className={styles.learningsHeaderLeft}>
            <div className={styles.learningsIconBadge}>
              <Icon name="lightbulb" className="size-5" />
            </div>
            <h3 className={styles.learningsTitle}>{data.keyLearningsHeader.title}</h3>
          </div>

          <p className={styles.learningsDescription}>
            {data.keyLearningsHeader.description}
          </p>
        </div>

        <div className={styles.learningsGrid}>
          {data.learnings.map((learning) => (
            <div key={learning.title} className={styles.learningItem}>
              <div className={styles.learningIcon}>
                <Icon name={learning.icon as IconName} className="size-4" />
              </div>
              <div className={styles.learningTexts}>
                <span className={styles.learningHeading}>{learning.title}</span>
                <span className={styles.learningText}>{learning.description}</span>
              </div>
            </div>
          ))}
        </div>

        {nextDest && (
          <div className={styles.bottomFooter}>
            <div className={styles.reflectionTag}>
              <span className="font-mono text-xs text-accent">● Community Reflection</span>
              <span className="text-xs text-muted">Building connections &amp; cloud expertise across Dehradun and Uttarakhand</span>
            </div>
            <BaseLink
              href={nextDest.href}
              className={styles.scrollCue}
              aria-label={`Scroll to next section: ${nextDest.label}`}
            >
              <div className={styles.scrollTextGroup}>
                <span className={styles.scrollSubtitle}>Scroll to Next</span>
                <span className="text-xs font-semibold text-foreground">
                  0{nextDest.number} {nextDest.label}
                </span>
              </div>
              <span className={styles.scrollCircle} aria-hidden="true">
                <Icon name="arrow-down" />
              </span>
            </BaseLink>
          </div>
        )}
      </div>

      {/* ── 4. Lightbox Modal for Authentic Photographs ────────────── */}
      {lightboxPhoto && (
        <div
          className={styles.modalBackdrop}
          onClick={() => setLightboxPhoto(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="photo-modal-title"
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h4 id="photo-modal-title" className={styles.modalTitle}>
                {lightboxPhoto.alt}
              </h4>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setLightboxPhoto(null)}
                className={styles.modalCloseBtn}
                aria-label="Close photograph view"
              >
                <Icon name="close" className="size-5" />
              </button>
            </div>

            <div className={styles.modalBody}>
              <Image
                src={lightboxPhoto.src}
                alt={lightboxPhoto.alt}
                width={lightboxPhoto.width}
                height={lightboxPhoto.height}
                className={styles.modalImage}
              />
            </div>

            <div className={styles.modalFooter}>
              <span>AWS Community Day 2025 · Verified Photograph</span>
              <span className="font-mono text-accent">Esc to close</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
