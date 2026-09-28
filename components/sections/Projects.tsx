import { Section } from "@/components/ui/Section";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { PUBLISHED } from "@/content/published";

export function Projects() {
  return (
    <Section id="projects">
      <div className="grid gap-5 sm:grid-cols-2">
        {PUBLISHED.projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </Section>
  );
}
