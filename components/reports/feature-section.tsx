"use client"

import { useEffect, useRef } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import { BarChart3, FileSpreadsheet, FileText, PieChart, Share2, Zap } from "lucide-react"

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separater";

const features = [
  {
    icon: <FileText className="h-10 w-10 text-primary" />,
    title: "PDF Reports",
    description: "Generate professional PDF reports with your company branding for sharing with stakeholders.",
    animation: "fade-right",
  },
  {
    icon: <FileSpreadsheet className="h-10 w-10 text-primary" />,
    title: "CSV Export",
    description: "Export your expense data to CSV format for further analysis in spreadsheet applications.",
    animation: "fade-up",
  },
  {
    icon: <BarChart3 className="h-10 w-10 text-primary" />,
    title: "Visual Analytics",
    description: "View your expense data through interactive charts and graphs for better insights.",
    animation: "fade-left",
  },
  {
    icon: <Share2 className="h-10 w-10 text-primary" />,
    title: "Scheduled Reports",
    description: "Set up automated report generation and delivery to your team on a schedule.",
    animation: "fade-right",
  },
  {
    icon: <PieChart className="h-10 w-10 text-primary" />,
    title: "Custom Grouping",
    description: "Group your expense data by category, date, vendor, or project for tailored reports.",
    animation: "fade-up",
  },
  {
    icon: <Zap className="h-10 w-10 text-primary" />,
    title: "Quick Insights",
    description: "Get instant insights with summary views highlighting key expense metrics and trends.",
    animation: "fade-left",
  },
]

const FeatureCard = ({ feature, index }:any) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const variants = {
    hidden: {
      opacity: 0,
      y: 20,
      x: feature.animation === "fade-right" ? -20 : feature.animation === "fade-left" ? 20 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut",
      },
    },
  }

  return (
    <motion.div ref={ref} initial="hidden" animate={controls} variants={variants}>
      <Card className="h-full">
        <CardHeader>
          <div className="mb-2">{feature.icon}</div>
          <CardTitle>{feature.title}</CardTitle>
          <CardDescription>{feature.description}</CardDescription>
        </CardHeader>
      </Card>
    </motion.div>
  )
}

export default function FeaturesSection() {
  const headerRef = useRef(null)
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.3 })
  const headerControls = useAnimation()

  useEffect(() => {
    if (isHeaderInView) {
      headerControls.start("visible")
    }
  }, [isHeaderInView, headerControls])

  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <section className="py-12">
      <motion.div
        ref={headerRef}
        initial="hidden"
        animate={headerControls}
        variants={headerVariants}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold tracking-tight mb-2">Powerful Reporting Features</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Our expense reporting system provides comprehensive tools to analyze and share your financial data
        </p>
        <Separator className="mt-8 max-w-md mx-auto" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {features.map((feature, index) => (
          <FeatureCard key={index} feature={feature} index={index} />
        ))}
      </div>
    </section>
  )
}

